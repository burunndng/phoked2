import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/progress
// body: { lessonId: string, completed: boolean }
// Upserts the progress row for the single anonymous learner.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.lessonId !== "string") {
    return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  }
  const completed = !!body.completed;

  const progress = await db.progress.upsert({
    where: { lessonId: body.lessonId },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
    },
    create: {
      lessonId: body.lessonId,
      completed,
      completedAt: completed ? new Date() : null,
    },
  });

  return NextResponse.json({ ok: true, progress });
}
