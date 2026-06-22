import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/syllabus — full curriculum map: modules + lesson metadata + progress
export async function GET() {
  const modules = await db.module.findMany({
    orderBy: { number: "asc" },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        include: { progress: true },
      },
    },
  });

  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
  const completed = modules.reduce(
    (n, m) => n + m.lessons.filter((l) => l.progress?.completed).length,
    0
  );

  return NextResponse.json({
    totalLessons,
    completed,
    modules: modules.map((m) => ({
      id: m.id,
      number: m.number,
      title: m.title,
      theme: m.theme,
      description: m.description,
      accent: m.accent,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        lessonCode: l.lessonCode,
        number: l.number,
        globalOrder: l.globalOrder,
        concept: l.concept,
        originators: l.originators,
        coreClaim: l.coreClaim,
        vector: l.vector,
        hasContent: !!l.content,
        completed: !!l.progress?.completed,
      })),
    })),
  });
}
