import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateLessonContent, type LessonContent } from "@/lib/lesson-generator";

// GET /api/lesson?id=<lessonId>
// Returns the lesson with its full composed content. If content has not been
// generated yet, composes it on-demand via the LLM and caches it.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

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

  // If content already cached, return it.
  if (lesson.content) {
    let content: LessonContent | null = null;
    try {
      content = JSON.parse(lesson.content) as LessonContent;
    } catch {
      content = null;
    }
    if (content) {
      return NextResponse.json({
        id: lesson.id,
        lessonCode: lesson.lessonCode,
        concept: lesson.concept,
        originators: lesson.originators,
        coreClaim: lesson.coreClaim,
        vector: lesson.vector,
        globalOrder: lesson.globalOrder,
        module: {
          id: lesson.module.id,
          number: lesson.module.number,
          title: lesson.module.title,
          theme: lesson.module.theme,
          accent: lesson.module.accent,
        },
        content,
        reflection: lesson.progress?.reflection ?? "",
        completed: !!lesson.progress?.completed,
      });
    }
  }

  // Gather prior lessons for cross-referencing (globalOrder < current).
  const priorLessons = await db.lesson.findMany({
    where: { globalOrder: { lt: lesson.globalOrder } },
    orderBy: { globalOrder: "asc" },
    select: { lessonCode: true, concept: true, originators: true },
  });

  // Compose via LLM.
  try {
    const content = await generateLessonContent({
      lessonCode: lesson.lessonCode,
      concept: lesson.concept,
      originators: lesson.originators,
      coreClaim: lesson.coreClaim,
      vector: lesson.vector,
      moduleTitle: lesson.module.title,
      moduleTheme: lesson.module.theme,
      priorLessons,
    });

    await db.lesson.update({
      where: { id: lesson.id },
      data: {
        content: JSON.stringify(content),
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({
      id: lesson.id,
      lessonCode: lesson.lessonCode,
      concept: lesson.concept,
      originators: lesson.originators,
      coreClaim: lesson.coreClaim,
      vector: lesson.vector,
      globalOrder: lesson.globalOrder,
      module: {
        id: lesson.module.id,
        number: lesson.module.number,
        title: lesson.module.title,
        theme: lesson.module.theme,
        accent: lesson.module.accent,
      },
      content,
      reflection: lesson.progress?.reflection ?? "",
      completed: !!lesson.progress?.completed,
    });
  } catch (err) {
    console.error("Lesson generation failed:", err);
    return NextResponse.json(
      { error: "Failed to compose lesson. Please retry." },
      { status: 502 }
    );
  }
}
