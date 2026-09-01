// Regenerates lesson content with the anti-formula rulebook.
//
// Usage (bun):
//   bun run scripts/regenerate-lessons.ts --modules=1            # module 1
//   bun run scripts/regenerate-lessons.ts --codes=1.1,1.2,4.8    # specific lessons
//   bun run scripts/regenerate-lessons.ts --modules=1 --write    # also merge into src/lib/lesson-content.ts
//   bun run scripts/regenerate-lessons.ts --merge=scripts/out/en/lessons-modules-1.json --write
//                                                                # merge a reviewed/hand-authored JSON file, no LLM calls
//
// Env (provider):
//   LLM_PROVIDER=zai|openai   (default: zai)
//   ZAI_BASE_URL + ZAI_API_KEY (+ ZAI_CHAT_ID / ZAI_USER_ID)  or  OPENAI_API_KEY (+ OPENAI_BASE_URL)
//   LLM_MODEL=...             (optional model override)
//
// Output: scripts/out/<lang>/lessons-<selection>.json — review it, then --write.

import { mkdir } from "node:fs/promises";
import { SYLLABUS } from "../src/lib/syllabus";
import {
  assignmentFor,
  buildUserPrompt,
  composeLesson,
  type ComposeResult,
  type LessonContent,
  type LessonContext,
} from "./composer";
import { getProvider } from "./providers";

interface OutEntry {
  lessonCode: string;
  concept: string;
  problems: string[];
  attempts: number;
  content: LessonContent;
}

function parseArgs(argv: string[]): {
  modules: number[];
  codes: string[];
  write: boolean;
  merge: string | null;
  outDir: string;
  lang: string;
} {
  const args: ReturnType<typeof parseArgs> = {
    modules: [],
    codes: [],
    write: false,
    merge: null,
    outDir: "scripts/out",
    lang: "en",
  };
  for (const a of argv) {
    if (a.startsWith("--modules=")) {
      args.modules = a
        .slice("--modules=".length)
        .split(",")
        .map((n) => parseInt(n, 10))
        .filter((n) => !Number.isNaN(n));
    } else if (a.startsWith("--codes=")) {
      args.codes = a
        .slice("--codes=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === "--write") {
      args.write = true;
    } else if (a.startsWith("--merge=")) {
      args.merge = a.slice("--merge=".length);
    } else if (a.startsWith("--out=")) {
      args.outDir = a.slice("--out=".length);
    } else if (a.startsWith("--lang=")) {
      args.lang = a.slice("--lang=".length);
    }
  }
  return args;
}

function selectLessons(
  modules: number[],
  codes: string[]
): { module: (typeof SYLLABUS)[number]; lesson: (typeof SYLLABUS)[number]["lessons"][number]; moduleNumber: number }[] {
  const out: ReturnType<typeof selectLessons> = [];
  for (const m of SYLLABUS) {
    for (const l of m.lessons) {
      if (codes.length) {
        if (codes.includes(l.lessonCode)) out.push({ module: m, lesson: l, moduleNumber: m.number });
      } else if (modules.length === 0 || modules.includes(m.number)) {
        out.push({ module: m, lesson: l, moduleNumber: m.number });
      }
    }
  }
  return out;
}

function buildContext(
  module: (typeof SYLLABUS)[number],
  lesson: (typeof SYLLABUS)[number]["lessons"][number],
  usedExamples: string[]
): LessonContext {
  const prior: { lessonCode: string; concept: string }[] = [];
  for (const m of SYLLABUS) {
    for (const l of m.lessons) {
      if (l.globalOrder < lesson.globalOrder) {
        prior.push({ lessonCode: l.lessonCode, concept: l.concept });
      }
    }
  }
  return {
    lessonCode: lesson.lessonCode,
    concept: lesson.concept,
    keyFigures: lesson.keyFigures,
    coreClaim: lesson.coreClaim,
    vector: lesson.vector,
    status: lesson.status,
    criticalNote: lesson.criticalNote ?? null,
    moduleTitle: module.title,
    moduleTheme: module.theme,
    priorLessons: prior,
    assignment: assignmentFor(lesson.globalOrder, lesson.lessonCode),
    usedExamples,
  };
}

// ── Merge back into src/lib/lesson-content.ts ────────────────────────

const FILE_HEADER = `// Pre-written lesson content for all 76 lessons.
// This is the source of truth — no on-the-fly LLM generation.
// Each lesson follows the mandated 8-part delivery spec:
//   coreClaim · mechanism · canonicalExample · conceptualTension ·
//   connectionNode (cross-references prior lessons by code) · microPraxis · zeigarnikHook
//
// Connection nodes contain lesson codes (e.g. "1.4", "2.10") that the
// knowledge graph parses into cross-reference edges, so keep them accurate.
//
// Content is written against the anti-formula rulebook in
// scripts/composer.ts (concrete dated examples, varied micro-praxis
// formats, named critics, no boilerplate). Regenerate with:
//   bun run scripts/regenerate-lessons.ts --modules=<n> --write

export interface LessonContent {
  coreClaim: string;
  mechanism: string;
  canonicalExample: string;
  conceptualTension: string;
  connectionNode: string;
  microPraxis: string;
  zeigarnikHook: string;
}

// keyed by lessonCode
export const LESSON_CONTENT: Record<string, LessonContent> = {
`;

// Header for the Castellano content map. Keys stay in English; values are ES.
const FILE_HEADER_ES = `// Pre-written lesson content in Castellano (European Spanish) for all 76 lessons.
// Mirrors src/lib/lesson-content.ts exactly — same examples, dates and scholar
// names; only the prose is translated. Lesson codes stay as-is because the
// knowledge graph parses them out of connectionNode text in either language.
// Regenerate a module with:
//   bun run scripts/regenerate-lessons.ts --lang=es --merge=scripts/out/es/lessons-modules-<n>.json --write

import type { LessonContent } from "./lesson-content";

// keyed by lessonCode
export const LESSON_CONTENT_ES: Record<string, LessonContent> = {
`;

const CONTENT_KEYS: (keyof LessonContent)[] = [
  "coreClaim",
  "mechanism",
  "canonicalExample",
  "conceptualTension",
  "connectionNode",
  "microPraxis",
  "zeigarnikHook",
];

// Where each language's content map lives and how it is exported.
const LANG_TARGET = {
  en: {
    path: "src/lib/lesson-content.ts",
    importPath: "../src/lib/lesson-content",
    exportName: "LESSON_CONTENT" as const,
    header: FILE_HEADER,
    hasInterface: true,
  },
  es: {
    path: "src/lib/lesson-content-es.ts",
    importPath: "../src/lib/lesson-content-es",
    exportName: "LESSON_CONTENT_ES" as const,
    header: FILE_HEADER_ES,
    hasInterface: false,
  },
};

function serializeLangFile(all: Map<string, LessonContent>, lang: Lang): string {
  const target = LANG_TARGET[lang];
  const parts: string[] = [target.header];
  // English must be complete; Castellano may be partial (untranslated
  // lessons fall back to English at read time, see lesson-i18n.ts).
  const strict = lang === "en";
  for (const m of SYLLABUS) {
    const translated = m.lessons.filter((l) => all.has(l.lessonCode));
    if (translated.length === 0) continue;
    parts.push(banner(`${m.number} — ${m.title}`));
    for (const l of m.lessons) {
      const c = all.get(l.lessonCode);
      if (!c) {
        if (strict) throw new Error(`Missing content for lesson ${l.lessonCode}`);
        continue;
      }
      parts.push(serializeEntry(l.lessonCode, c));
    }
  }
  parts.push("};");
  return parts.join("\n") + "\n";
}

function banner(moduleTitle: string): string {
  const bar = "═".repeat(67);
  return `  // ${bar}\n  // MODULE — ${moduleTitle}\n  // ${bar}\n`;
}

function serializeEntry(lessonCode: string, c: LessonContent): string {
  const lines = [`  ${JSON.stringify(lessonCode)}: {`];
  for (const k of CONTENT_KEYS) {
    lines.push(`    ${k}:`);
    lines.push(`      ${JSON.stringify(c[k])},`);
  }
  lines.push("  },");
  return lines.join("\n");
}

function serializeFile(all: Map<string, LessonContent>): string {
  const parts: string[] = [FILE_HEADER];
  for (const m of SYLLABUS) {
    parts.push(banner(`${m.number} — ${m.title}`));
    for (const l of m.lessons) {
      const c = all.get(l.lessonCode);
      if (!c) throw new Error(`Missing content for lesson ${l.lessonCode}`);
      parts.push(serializeEntry(l.lessonCode, c));
    }
  }
  parts.push("};");
  return parts.join("\n") + "\n";
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(Bun.argv.slice(2));

  // Merge-only mode: apply a reviewed JSON file, no LLM calls.
  if (args.merge) {
    if (!args.write) {
      console.error("--merge requires --write");
      process.exit(1);
    }
    const raw = await Bun.file(args.merge).text();
    const parsed = JSON.parse(raw) as Record<string, OutEntry>;
    const entries = Object.entries(parsed);
    if (entries.length === 0) {
      console.error(`No entries in ${args.merge}`);
      process.exit(1);
    }
    const missing = entries.filter(
      ([code, e]) =>
        !e?.content || CONTENT_KEYS.some((k) => typeof e.content[k] !== "string")
    );
    if (missing.length) {
      console.error(
        `Invalid entries: ${missing.map(([c]) => c).join(", ")} — expected all 7 content keys.`
      );
      process.exit(1);
    }
    const lang = args.lang === "es" ? "es" : "en";
    const targetMeta = LANG_TARGET[lang];
    let existing: Record<string, LessonContent>;
    if (lang === "es") {
      try {
        existing = (await import(targetMeta.importPath))[
          targetMeta.exportName
        ] as Record<string, LessonContent>;
      } catch {
        existing = {};
      }
    } else {
      existing = (await import("../src/lib/lesson-content"))
        .LESSON_CONTENT as Record<string, LessonContent>;
    }
    const merged = new Map(Object.entries(existing));
    for (const [code, entry] of entries) {
      merged.set(code, entry.content);
    }
    const target = targetMeta.path;
    await Bun.write(`${target}.bak`, await Bun.file(target).text());
    await Bun.write(target, serializeLangFile(merged, lang));
    console.log(
      `Merged ${entries.length} lesson(s) [${lang}] from ${args.merge} into ${target} (backup: ${target}.bak)`
    );
    return;
  }

  if (args.modules.length === 0 && args.codes.length === 0) {
    console.error("Usage: bun run scripts/regenerate-lessons.ts --modules=1|--codes=1.1,1.2 [--write]");
    process.exit(1);
  }

  const provider = await getProvider();
  console.log(`Provider: ${provider.name}`);
  const selected = selectLessons(args.modules, args.codes);
  console.log(`Lessons selected: ${selected.length} (${selected.map((s) => s.lesson.lessonCode).join(", ")})`);

  const outDir = `${args.outDir}/${args.lang}`;
  await mkdir(outDir, { recursive: true });

  const results = new Map<string, OutEntry>();
  const usedExamples: string[] = [];

  for (let i = 0; i < selected.length; i++) {
    const { module, lesson } = selected[i];
    const ctx = buildContext(module, lesson, usedExamples);
    console.log(`\n[${i + 1}/${selected.length}] Composing ${lesson.lessonCode} — ${lesson.concept}`);
    const res = await composeLesson(provider, ctx);
    if (res.problems.some((p) => p.severity === "fail")) {
      console.warn(
        `  !! ${res.attempts} attempts, remaining failures: ${res.problems
          .map((p) => `${p.severity}: ${p.message}`)
          .join(" | ")}`
      );
    } else if (res.problems.length) {
      console.warn(
        `  ~ warnings: ${res.problems.map((p) => p.message).join(" | ")}`
      );
    }
    console.log(
      `  OK (attempt ${res.attempts}) — ${JSON.stringify(res.content).length} chars`
    );
    usedExamples.push(res.content.canonicalExample.slice(0, 110));
    results.set(lesson.lessonCode, {
      lessonCode: lesson.lessonCode,
      concept: lesson.concept,
      problems: res.problems.map((p) => `${p.severity}: ${p.message}`),
      attempts: res.attempts,
      content: res.content,
    });
  }

  const selectionName =
    args.codes.length > 0
      ? args.codes.join("-")
      : `modules-${args.modules.join("-")}`;
  const outPath = `${outDir}/lessons-${selectionName}.json`;
  await Bun.write(
    outPath,
    JSON.stringify(Object.fromEntries(results), null, 2)
  );
  console.log(`\nWrote ${outPath}`);

  if (args.write) {
    const existing = (await import("../src/lib/lesson-content"))
      .LESSON_CONTENT as Record<string, LessonContent>;
    const merged = new Map(Object.entries(existing));
    for (const [code, entry] of results) {
      merged.set(code, entry.content);
    }
    const target = "src/lib/lesson-content.ts";
    await Bun.write(`${target}.bak`, await Bun.file(target).text());
    await Bun.write(target, serializeFile(merged));
    console.log(`Merged into ${target} (backup: ${target}.bak)`);
  }
}

main().catch((err) => {
  console.error("\nFatal:", err instanceof Error ? err.message : err);
  process.exit(1);
});
