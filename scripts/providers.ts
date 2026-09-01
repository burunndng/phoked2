// Pluggable LLM providers for content regeneration.
// One generic OpenAI-compatible HTTP client serves both:
//   - z.ai (baseUrl from ZAI_BASE_URL or a .z-ai-config file, plus
//     X-Chat-Id / X-User-Id headers), matching the project's existing SDK
//   - any other OpenAI-compatible endpoint (OpenAI, OpenRouter, local, ...)

export interface Provider {
  name: string;
  complete(system: string, user: string): Promise<string>;
}

interface HttpProviderConfig {
  baseUrl: string;
  apiKey: string;
  model?: string;
  headers?: Record<string, string>;
  temperature?: number;
}

class HttpProvider implements Provider {
  name: string;

  constructor(
    private cfg: HttpProviderConfig,
    name: string
  ) {
    this.name = name;
  }

  async complete(system: string, user: string): Promise<string> {
    const url = `${this.cfg.baseUrl.replace(/\/+$/, "")}/chat/completions`;
    const body: Record<string, unknown> = {
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: this.cfg.temperature ?? 0.9,
    };
    if (this.cfg.model) body.model = this.cfg.model;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.cfg.apiKey}`,
      ...(this.cfg.headers ?? {}),
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`LLM HTTP ${res.status}: ${text.slice(0, 400)}`);
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Empty completion from provider");
    }
    return content;
  }
}

// Read a z.ai config file using the SDK's search order.
async function readZaiConfigFile(): Promise<{
  baseUrl: string;
  apiKey: string;
  chatId?: string;
  userId?: string;
} | null> {
  const paths = [
    ".z-ai-config",
    process.env.HOME ? `${process.env.HOME}/.z-ai-config` : "",
    "/etc/.z-ai-config",
  ].filter(Boolean);
  for (const p of paths) {
    try {
      const raw = await Bun.file(p).text();
      const cfg = JSON.parse(raw) as {
        baseUrl?: string;
        apiKey?: string;
        chatId?: string;
        userId?: string;
      };
      if (cfg.baseUrl && cfg.apiKey) {
        return {
          baseUrl: cfg.baseUrl,
          apiKey: cfg.apiKey,
          chatId: cfg.chatId,
          userId: cfg.userId,
        };
      }
    } catch {
      // try the next path
    }
  }
  return null;
}

export async function getProvider(): Promise<Provider> {
  const kind = (process.env.LLM_PROVIDER ?? "").toLowerCase().trim();

  // z.ai (default — matches the project's existing SDK dependency)
  if (!kind || kind === "zai" || kind === "z.ai") {
    const file = await readZaiConfigFile();
    const baseUrl = process.env.ZAI_BASE_URL ?? file?.baseUrl;
    const apiKey = process.env.ZAI_API_KEY ?? file?.apiKey;
    if (!baseUrl || !apiKey) {
      throw new Error(
        "z.ai provider needs credentials. Set ZAI_BASE_URL + ZAI_API_KEY " +
          "(optionally ZAI_CHAT_ID / ZAI_USER_ID), or create a .z-ai-config " +
          "file (see the z-ai-web-dev-sdk README)."
      );
    }
    const headers: Record<string, string> = { "X-Z-AI-From": "Z" };
    const chatId = process.env.ZAI_CHAT_ID ?? file?.chatId;
    const userId = process.env.ZAI_USER_ID ?? file?.userId;
    if (chatId) headers["X-Chat-Id"] = chatId;
    if (userId) headers["X-User-Id"] = userId;
    return new HttpProvider(
      {
        baseUrl,
        apiKey,
        model: process.env.LLM_MODEL,
        headers,
        temperature: 0.9,
      },
      `z.ai${process.env.LLM_MODEL ? ` (${process.env.LLM_MODEL})` : ""}`
    );
  }

  // Generic OpenAI-compatible
  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is required for the openai-compatible provider."
    );
  }
  return new HttpProvider(
    {
      baseUrl,
      apiKey,
      model: process.env.LLM_MODEL ?? "gpt-4.1",
      temperature: 0.9,
    },
    `openai-compatible (${baseUrl})`
  );
}
