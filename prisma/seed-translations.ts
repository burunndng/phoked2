// Batch-translates all module + lesson metadata to Castellano (European Spanish)
// using the LLM. Run once after the main seed: `bun run prisma/seed-translations.ts`
// Idempotent: skips lessons that already have Spanish translations.

import ZAI from "z-ai-web-dev-sdk";
import { db } from "../src/lib/db";

interface ModuleBatch {
  number: number;
  title: string;
  theme: string;
  description: string;
  lessons: {
    lessonCode: string;
    concept: string;
    coreClaim: string;
    criticalNote: string | null;
  }[];
}

interface TranslationResult {
  title: string;
  theme: string;
  description: string;
  lessons: Record<
    string,
    { concept: string; coreClaim: string; criticalNote?: string | null }
  >;
}

const SYSTEM_PROMPT = [
  "You are a scholarly translator specializing in European Spanish (Castellano) for academic and philosophical texts.",
  "",
  "Translate the provided curriculum metadata from English to Castellano (European Spanish). Rules:",
  "- Use European Spanish vocabulary and conventions (e.g., 'ordenador' not 'computadora'; 'móvil' not 'celular').",
  "- Maintain a formal academic register suitable for graduate-level interdisciplinary theory.",
  "- Preserve proper names of scholars (Foucault, Haraway, Nāgārjuna, etc.) — do not translate them.",
  "- Preserve the lesson codes (e.g., '1.1', '8.8') exactly as given.",
  "- Preserve technical terms that are standardly kept in English in Spanish academic writing (e.g., 'LLM', 'AQAL', 'BANI', 'Cynefin') — you may add a brief gloss in parentheses on first use if helpful.",
  "- For 'criticalNote' fields: translate faithfully, preserving references to scholars, journal names, and dates. If a criticalNote is null/absent, omit it.",
  "- Keep the same precision and tone as the original. Do not simplify or soften.",
  "",
  "Respond with VALID JSON ONLY — no markdown fences, no preamble. The JSON must have this shape:",
  '{"title":"...","theme":"...","description":"...","lessons":{"1.1":{"concept":"...","coreClaim":"...","criticalNote":"... (omit if none)"},...}}',
].join("\n");

function buildUserPrompt(m: ModuleBatch): string {
  const lessons = m.lessons
    .map(
      (l) =>
        `${l.lessonCode} | concept: ${l.concept} | coreClaim: ${l.coreClaim}${
          l.criticalNote ? ` | criticalNote: ${l.criticalNote}` : ""
        }`
    )
    .join("\n");

  return [
    `Translate module ${m.number} to Castellano.`,
    "",
    `MODULE TITLE: ${m.title}`,
    `MODULE THEME: ${m.theme}`,
    `MODULE DESCRIPTION: ${m.description}`,
    "",
    "LESSONS:",
    lessons,
    "",
    "Return only the JSON object.",
  ].join("\n");
}

function extractJson(raw: string): TranslationResult {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found");
  return JSON.parse(text.slice(start, end + 1));
}

async function translateModule(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  m: ModuleBatch
): Promise<TranslationResult> {
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(m) },
        ],
        thinking: { type: "disabled" },
      });
      const raw = completion.choices[0]?.message?.content;
      if (!raw) throw new Error("Empty response");
      return extractJson(raw);
    } catch (err) {
      lastError = err;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`Failed to translate module ${m.number}`);
}

async function main() {
  console.log("Loading modules from DB...");
  const modules = await db.module.findMany({
    orderBy: { number: "asc" },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        select: {
          id: true,
          lessonCode: true,
          concept: true,
          coreClaim: true,
          criticalNote: true,
          conceptEs: true,
        },
      },
    },
  });

  // Skip modules where ALL lessons already have conceptEs
  const needTranslation = modules.filter(
    (m) => !m.lessons.every((l) => l.conceptEs)
  );
  if (needTranslation.length === 0) {
    console.log("All modules already have Spanish translations. Nothing to do.");
    return;
  }

  console.log(
    `Translating ${needTranslation.length} module(s) to Castellano...`
  );
  const zai = await ZAI.create();

  for (const m of needTranslation) {
    const batch: ModuleBatch = {
      number: m.number,
      title: m.title,
      theme: m.theme,
      description: m.description,
      lessons: m.lessons.map((l) => ({
        lessonCode: l.lessonCode,
        concept: l.concept,
        coreClaim: l.coreClaim,
        criticalNote: l.criticalNote,
      })),
    };

    try {
      console.log(`  Module ${m.number}: ${m.title}...`);
      const result = await translateModule(zai, batch);

      await db.module.update({
        where: { id: m.id },
        data: {
          titleEs: result.title,
          themeEs: result.theme,
          descriptionEs: result.description,
        },
      });

      for (const l of m.lessons) {
        const tr = result.lessons[l.lessonCode];
        if (!tr) {
          console.warn(`    ⚠ no translation for ${l.lessonCode}`);
          continue;
        }
        await db.lesson.update({
          where: { id: l.id },
          data: {
            conceptEs: tr.concept,
            coreClaimEs: tr.coreClaim,
            criticalNoteEs: tr.criticalNote ?? null,
          },
        });
      }
      console.log(`    ✓ done (${m.lessons.length} lessons)`);
    } catch (e) {
      console.error(`    ✗ failed:`, e instanceof Error ? e.message : e);
    }
  }

  const esCount = await db.lesson.count({ where: { conceptEs: { not: null } } });
  console.log(`\nDone. ${esCount}/76 lessons have Spanish translations.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
