import { NextResponse } from "next/server";
import { getSyllabus } from "@/lib/syllabus-i18n";
import { hasLessonContent } from "@/lib/lesson-i18n";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

// Generate stable IDs from lesson codes so the client can reference them.
// These are deterministic and consistent across requests.
function lessonId(moduleNumber: number, lessonNumber: number): string {
  return `m${moduleNumber}l${lessonNumber}`;
}
function moduleId(moduleNumber: number): string {
  return `m${moduleNumber}`;
}

// GET /api/syllabus?lang=en|es — full curriculum map.
// DB-free: metadata comes from the static SYLLABUS constant, overlaid with
// the Castellano translations in src/lib/syllabus-es.ts when lang=es
// (falling back to English for anything not yet translated).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = pickLang(url.searchParams);

  const syllabus = getSyllabus(lang);
  const totalLessons = syllabus.reduce((n, m) => n + m.lessons.length, 0);

  return NextResponse.json({
    totalLessons,
    completed: 0, // progress is client-side (localStorage) now
    lang,
    modules: syllabus.map((m) => ({
      id: moduleId(m.number),
      number: m.number,
      title: m.title,
      theme: m.theme,
      description: m.description,
      accent: m.accent,
      lessons: m.lessons.map((l) => ({
        id: lessonId(m.number, l.number),
        lessonCode: l.lessonCode,
        number: l.number,
        globalOrder: l.globalOrder,
        concept: l.concept,
        keyFigures: l.keyFigures,
        coreClaim: l.coreClaim,
        vector: l.vector,
        status: l.status,
        criticalNote: l.criticalNote ?? null,
        hasContent: hasLessonContent(l.lessonCode, lang),
        completed: false, // client-side
      })),
    })),
  });
}
