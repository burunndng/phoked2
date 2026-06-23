import { NextResponse } from "next/server";
import { SYLLABUS } from "@/lib/syllabus";
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
// DB-free: all metadata comes from the static SYLLABUS constant.
// (Spanish translations are applied if/when seeded; for now, ES falls back
// to English metadata for module/lesson fields.)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = pickLang(url.searchParams);

  const totalLessons = SYLLABUS.reduce((n, m) => n + m.lessons.length, 0);

  return NextResponse.json({
    totalLessons,
    completed: 0, // progress is client-side (localStorage) now
    lang,
    modules: SYLLABUS.map((m) => ({
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
        hasContent: true,
        completed: false, // client-side
      })),
    })),
  });
}
