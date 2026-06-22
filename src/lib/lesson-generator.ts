import ZAI from "z-ai-web-dev-sdk";

// The generated body of a lesson, following the mandated delivery specification.
export interface LessonContent {
  coreClaim: string; // 2 sentences max — maximum precision
  mechanism: string; // how it actually operates in reality
  canonicalExample: string; // post-2020, specific, non-obvious
  conceptualTension: string; // the paradox or critique that makes it alive
  connectionNode: string; // >=1 explicit cross-link to prior lesson
  microPraxis: string; // 90-second actionable exercise, immediate
  zeigarnikHook: string; // one unresolved generative question — no answer
}

export interface LessonContext {
  lessonCode: string;
  concept: string;
  originators: string;
  coreClaim: string;
  vector: string;
  moduleTitle: string;
  moduleTheme: string;
  // prior lessons (globalOrder < current) to draw cross-references from
  priorLessons: { lessonCode: string; concept: string; originators: string }[];
}

const VECTOR_LABEL: Record<string, string> = {
  critical: "Critical/Structural",
  materialist: "Materialist/Formal",
  phenomenological: "Phenomenological/Contemplative",
  ecological: "Ecological/More-than-human",
};

const SYSTEM_PROMPT = `You are the composing intelligence behind a micro-learning curriculum called "Understanding Reality's Architecture" — a 10-week, 76-lesson journey through epistemics, cognition, social construction, power, complexity, political economy, the digital paradigm, and integrative praxis.

Your task: compose a single lesson session following a MANDATORY eight-part structure. The register rotates across empirical, philosophical, and contemplative. The audience is a thoughtful adult learner willing to sit with difficulty. Precision over comfort. Never flatten a concept to make it palatable.

HARD RULES:
- Total length 500–800 words across all sections combined.
- CORE CLAIM: 2 sentences maximum. Maximum precision. No hedging.
- CANONICAL EXAMPLE: must be POST-2020, specific, non-obvious. No textbook clichés. Name a real event, platform, policy, or phenomenon.
- CONNECTION NODE: must explicitly cross-link to at least one PRIOR lesson from the provided list, by lesson code and concept. Cross-references are load-bearing — never skip.
- MICRO-PRAXIS: a single 90-second actionable exercise the reader can do immediately. Concrete, embodied, not a journaling prompt.
- ZEIGARNIK HOOK: one unresolved generative question. No answer. It should lodge in the mind.
- No filler, no "in conclusion", no bullet-point padding. Every sentence must earn its place.
- Respect the four integrated vectors: Critical/Structural, Materialist/Formal, Phenomenological/Contemplative, Ecological/More-than-human. The lesson's primary vector is given; let it lead, but let the others breathe at the margins.

You must respond with VALID JSON ONLY — no markdown fences, no preamble, no commentary. The JSON must have exactly these keys:
coreClaim, mechanism, canonicalExample, conceptualTension, connectionNode, microPraxis, zeigarnikHook

Each value is a string. Use \\n\\n for paragraph breaks within a field where natural. Do not invent keys.`;

function buildUserPrompt(ctx: LessonContext): string {
  const prior = ctx.priorLessons
    .map((p) => `- ${p.lessonCode} "${p.concept}" (${p.originators})`)
    .join("\n");

  return `Compose lesson ${ctx.lessonCode}.

MODULE: ${ctx.moduleTitle}
MODULE THEME: ${ctx.moduleTheme}
PRIMARY VECTOR: ${VECTOR_LABEL[ctx.vector] ?? ctx.vector}

CONCEPT: ${ctx.concept}
ORIGINATOR(S): ${ctx.originators}
CORE CLAIM (from syllabus, refine but do not contradict): ${ctx.coreClaim}

PRIOR LESSONS available for the CONNECTION NODE (choose at least one, prefer the most illuminating):
${prior || "(none — this is the opening lesson; reference the curriculum's architecture instead)"}

Return only the JSON object.`;
}

function extractJson(raw: string): LessonContent {
  // Strip markdown fences if present
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();

  // Find the outermost JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in LLM response");
  }
  const slice = text.slice(start, end + 1);
  const parsed = JSON.parse(slice);

  const required: (keyof LessonContent)[] = [
    "coreClaim",
    "mechanism",
    "canonicalExample",
    "conceptualTension",
    "connectionNode",
    "microPraxis",
    "zeigarnikHook",
  ];
  for (const k of required) {
    if (typeof parsed[k] !== "string" || !parsed[k].trim()) {
      throw new Error(`Missing or invalid field: ${k}`);
    }
  }
  return parsed as LessonContent;
}

export async function generateLessonContent(
  ctx: LessonContext
): Promise<LessonContent> {
  const zai = await ZAI.create();

  let lastError: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(ctx) },
        ],
        thinking: { type: "disabled" },
      });

      const raw = completion.choices[0]?.message?.content;
      if (!raw) throw new Error("Empty response from model");

      return extractJson(raw);
    } catch (err) {
      lastError = err;
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 800 * attempt));
      }
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to generate lesson content");
}
