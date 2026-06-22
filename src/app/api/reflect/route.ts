import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/reflect
// body: { lessonId: string, reflection: string }
// Saves the learner's private reflection notes for a lesson.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.lessonId !== "string") {
    return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  }
  const reflection =
    typeof body.reflection === "string" ? body.reflection.slice(0, 5000) : "";

  const progress = await db.progress.upsert({
    where: { lessonId: body.lessonId },
    update: { reflection },
    create: { lessonId: body.lessonId, reflection },
  });

  return NextResponse.json({ ok: true, progress });
}
