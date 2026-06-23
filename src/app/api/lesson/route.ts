import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { LESSON_CONTENT } from "@/lib/lesson-content";
import type { LessonStatus } from "@/lib/lesson-generator";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

// GET /api/lesson?id=<lessonId>&lang=en|es
// Returns the lesson with its full pre-written content.
// Content is now sourced from the static LESSON_CONTENT map (no LLM).
// The DB is used only for metadata (concept, keyFigures, etc., with ES fallback)
// and for per-learner progress + private reflection.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const lang = pickLang(req.nextUrl.searchParams);

  const lesson = await db.lesson.findUnique({
    where: { id },
    include: {
      module: true,
      progress: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // Resolve metadata in the requested language (fall back to English).
  // (ES metadata is seeded by prisma/seed-translations.ts when available.)
  const concept =
    lang === "es" && lesson.conceptEs ? lesson.conceptEs : lesson.concept;
  const coreClaim =
    lang === "es" && lesson.coreClaimEs ? lesson.coreClaimEs : lesson.coreClaim;
  const criticalNote =
    lang === "es" && lesson.criticalNoteEs !== null
      ? lesson.criticalNoteEs
      : lesson.criticalNote;
  const moduleTitle =
    lang === "es" && lesson.module.titleEs
      ? lesson.module.titleEs
      : lesson.module.title;
  const moduleTheme =
    lang === "es" && lesson.module.themeEs
      ? lesson.module.themeEs
      : lesson.module.theme;

  const base = {
    id: lesson.id,
    lessonCode: lesson.lessonCode,
    concept,
    keyFigures: lesson.keyFigures,
    coreClaim,
    vector: lesson.vector,
    status: lesson.status as LessonStatus,
    criticalNote,
    globalOrder: lesson.globalOrder,
    module: {
      id: lesson.module.id,
      number: lesson.module.number,
      title: moduleTitle,
      theme: moduleTheme,
      accent: lesson.module.accent,
    },
    reflection: lesson.progress?.reflection ?? "",
    completed: !!lesson.progress?.completed,
    lang,
  };

  // Static content is English-authored. For ES, fall back to the English
  // content (metadata is still translated) until a translation pass exists.
  const content = LESSON_CONTENT[lesson.lessonCode];
  if (!content) {
    return NextResponse.json(
      { error: "No pre-written content for this lesson." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...base, content });
}
