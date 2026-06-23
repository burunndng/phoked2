import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

// GET /api/syllabus?lang=en|es — full curriculum map in the requested language
export async function GET(req: NextRequest) {
  const lang = pickLang(req.nextUrl.searchParams);

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
    lang,
    modules: modules.map((m) => {
      const title = lang === "es" && m.titleEs ? m.titleEs : m.title;
      const theme = lang === "es" && m.themeEs ? m.themeEs : m.theme;
      const description =
        lang === "es" && m.descriptionEs ? m.descriptionEs : m.description;
      return {
        id: m.id,
        number: m.number,
        title,
        theme,
        description,
        accent: m.accent,
        lessons: m.lessons.map((l) => {
          const concept =
            lang === "es" && l.conceptEs ? l.conceptEs : l.concept;
          const coreClaim =
            lang === "es" && l.coreClaimEs ? l.coreClaimEs : l.coreClaim;
          const criticalNote =
            lang === "es" && l.criticalNoteEs !== null
              ? l.criticalNoteEs
              : l.criticalNote;
          return {
            id: l.id,
            lessonCode: l.lessonCode,
            number: l.number,
            globalOrder: l.globalOrder,
            concept,
            keyFigures: l.keyFigures,
            coreClaim,
            vector: l.vector,
            status: l.status,
            criticalNote,
            hasContent: !!l.content,
            completed: !!l.progress?.completed,
          };
        }),
      };
    }),
  });
}
