import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Lang } from "@/lib/i18n";
import type { LessonContent } from "@/lib/lesson-generator";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

interface ContentStore {
  en?: LessonContent;
  es?: LessonContent;
}

// Parse lesson-code references (e.g. "3.2", "7.1") from a text field.
const LESSON_CODE_RE = /\b(\d{1,2})\.(\d{1,2})\b/g;

function extractLessonCodes(text: string): string[] {
  const codes: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = LESSON_CODE_RE.exec(text)) !== null) {
    // Filter out obviously non-lesson-code matches (e.g. version numbers).
    const mod = parseInt(m[1], 10);
    const les = parseInt(m[2], 10);
    if (mod >= 1 && mod <= 8 && les >= 1 && les <= 10) {
      codes.push(m[0]);
    }
  }
  return codes;
}

interface GraphNode {
  id: string;
  lessonCode: string;
  concept: string;
  moduleNumber: number;
  accent: string;
  vector: string;
  status: string;
  completed: boolean;
  hasContent: boolean;
  globalOrder: number;
}

interface GraphEdge {
  source: string; // lesson id
  target: string; // lesson id
  sourceCode: string;
  targetCode: string;
  type: "reference" | "sequence";
}

// GET /api/graph?lang=en|es
// Returns the full knowledge graph: 76 nodes + edges.
// Edges come from two sources:
//   1. "reference" — lesson codes parsed from generated connectionNode text
//   2. "sequence" — the linear reading order (each lesson → the next)
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

  // Build a lookup: lessonCode → lesson DB row (for edge resolution).
  const byCode = new Map<
    string,
    { id: string; lessonCode: string; moduleNumber: number }
  >();

  const nodes: GraphNode[] = [];
  const flatLessons: {
    id: string;
    lessonCode: string;
    moduleNumber: number;
    globalOrder: number;
    content: string | null;
  }[] = [];

  for (const m of modules) {
    for (const l of m.lessons) {
      const concept =
        lang === "es" && l.conceptEs ? l.conceptEs : l.concept;
      byCode.set(l.lessonCode, {
        id: l.id,
        lessonCode: l.lessonCode,
        moduleNumber: m.number,
      });
      nodes.push({
        id: l.id,
        lessonCode: l.lessonCode,
        concept,
        moduleNumber: m.number,
        accent: m.accent,
        vector: l.vector,
        status: l.status,
        completed: !!l.progress?.completed,
        hasContent: !!l.content,
      });
      flatLessons.push({
        id: l.id,
        lessonCode: l.lessonCode,
        moduleNumber: m.number,
        globalOrder: l.globalOrder,
        content: l.content,
      });
    }
  }

  // Sort by globalOrder for sequential edges.
  flatLessons.sort((a, b) => a.globalOrder - b.globalOrder);

  const edges: GraphEdge[] = [];
  const edgeSet = new Set<string>(); // dedup: "source→target"

  const addEdge = (
    sourceId: string,
    sourceCode: string,
    targetCode: string
  ) => {
    const target = byCode.get(targetCode);
    if (!target || target.id === sourceId) return;
    // Only add edges to PRIOR lessons (the connectionNode references prior work).
    // This keeps the graph directed and meaningful.
    const key = `${sourceCode}→${targetCode}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push({
      source: sourceId,
      target: target.id,
      sourceCode,
      targetCode,
      type: "reference",
    });
  };

  // 1. Parse reference edges from generated connectionNode content.
  for (const l of flatLessons) {
    if (!l.content) continue;
    try {
      const store = JSON.parse(l.content) as ContentStore;
      const content = store[lang] ?? store.en;
      if (!content?.connectionNode) continue;
      const codes = extractLessonCodes(content.connectionNode);
      for (const code of codes) {
        addEdge(l.id, l.lessonCode, code);
      }
    } catch {
      // malformed content — skip
    }
  }

  // 2. Add sequential edges (each lesson → the next in reading order).
  // These are "sequence" type, rendered lighter.
  for (let i = 0; i < flatLessons.length - 1; i++) {
    const cur = flatLessons[i];
    const nxt = flatLessons[i + 1];
    const key = `${cur.lessonCode}→${nxt.lessonCode}`;
    if (edgeSet.has(key)) continue;
    edgeSet.add(key);
    edges.push({
      source: cur.id,
      target: nxt.id,
      sourceCode: cur.lessonCode,
      targetCode: nxt.lessonCode,
      type: "sequence",
    });
  }

  return NextResponse.json({
    nodes,
    edges,
    lang,
    stats: {
      totalNodes: nodes.length,
      referenceEdges: edges.filter((e) => e.type === "reference").length,
      sequenceEdges: edges.filter((e) => e.type === "sequence").length,
    },
  });
}
