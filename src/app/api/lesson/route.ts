import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  generateLessonContent,
  type LessonContent,
  type LessonStatus,
} from "@/lib/lesson-generator";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

// Content is stored as JSON: {"en"?: LessonContent, "es"?: LessonContent}
interface ContentStore {
  en?: LessonContent;
  es?: LessonContent;
}

// GET /api/lesson?id=<lessonId>&lang=en|es
// Returns the lesson with its full composed content in the requested language.
// If content in that language has not been generated yet, composes on-demand
// via the LLM and caches it.
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

  // Parse stored content (now a per-language JSON store).
  let store: ContentStore = {};
  if (lesson.content) {
    try {
      store = JSON.parse(lesson.content) as ContentStore;
    } catch {
      store = {};
    }
  }

  // If content already cached in this language, return it.
  if (store[lang]) {
    return NextResponse.json({ ...base, content: store[lang] });
  }

  // Gather prior lessons for cross-referencing (globalOrder < current).
  // Use the requested language for prior lesson concepts.
  const priorLessons = await db.lesson.findMany({
    where: { globalOrder: { lt: lesson.globalOrder } },
    orderBy: { globalOrder: "asc" },
    select: {
      lessonCode: true,
      concept: true,
      conceptEs: true,
      keyFigures: true,
    },
  });

  // Compose via LLM in the requested language.
  try {
    const content = await generateLessonContent({
      lessonCode: lesson.lessonCode,
      concept,
      keyFigures: lesson.keyFigures,
      coreClaim,
      vector: lesson.vector,
      status: lesson.status as LessonStatus,
      criticalNote,
      moduleTitle,
      moduleTheme,
      lang,
      priorLessons: priorLessons.map((p) => ({
        lessonCode: p.lessonCode,
        concept:
          lang === "es" && p.conceptEs ? p.conceptEs : p.concept,
        keyFigures: p.keyFigures,
      })),
    });

    // Merge the new language into the stored content.
    const newStore: ContentStore = { ...store, [lang]: content };
    await db.lesson.update({
      where: { id: lesson.id },
      data: {
        content: JSON.stringify(newStore),
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({ ...base, content });
  } catch (err) {
    console.error("Lesson generation failed:", err);
    return NextResponse.json(
      { error: "Failed to compose lesson. Please retry." },
      { status: 502 }
    );
  }
}
