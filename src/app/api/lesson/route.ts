import { NextResponse } from "next/server";
import { getSyllabus } from "@/lib/syllabus-i18n";
import { getLessonContent } from "@/lib/lesson-i18n";
import type { LessonStatus } from "@/lib/syllabus";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

function lessonId(moduleNumber: number, lessonNumber: number): string {
  return `m${moduleNumber}l${lessonNumber}`;
}
function moduleId(moduleNumber: number): string {
  return `m${moduleNumber}`;
}

// GET /api/lesson?id=<lessonId>&lang=en|es
// DB-free: metadata from the (optionally Castellano) syllabus, content from
// LESSON_CONTENT or LESSON_CONTENT_ES depending on lang.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const lang = pickLang(url.searchParams);
  const syllabus = getSyllabus(lang);

  // Find the lesson in the static syllabus by its deterministic ID.
  let found:
    | { module: (typeof syllabus)[number]; lesson: (typeof syllabus)[number]["lessons"][number] }
    | null = null;

  for (const m of syllabus) {
    for (const l of m.lessons) {
      if (lessonId(m.number, l.number) === id) {
        found = { module: m, lesson: l };
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const { module: m, lesson: l } = found;
  const content = getLessonContent(l.lessonCode, lang);
  if (!content) {
    return NextResponse.json(
      { error: "No pre-written content for this lesson." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: lessonId(m.number, l.number),
    lessonCode: l.lessonCode,
    concept: l.concept,
    keyFigures: l.keyFigures,
    coreClaim: l.coreClaim,
    vector: l.vector,
    status: l.status as LessonStatus,
    criticalNote: l.criticalNote ?? null,
    globalOrder: l.globalOrder,
    module: {
      id: moduleId(m.number),
      number: m.number,
      title: m.title,
      theme: m.theme,
      accent: m.accent,
    },
    reflection: "", // client-side now
    completed: false, // client-side now
    lang,
    content,
  });
}
