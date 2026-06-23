import { NextResponse } from "next/server";
import { SYLLABUS } from "@/lib/syllabus";
import { LESSON_CONTENT } from "@/lib/lesson-content";
import type { Lang } from "@/lib/i18n";

function pickLang(searchParams: URLSearchParams): Lang {
  return searchParams.get("lang") === "es" ? "es" : "en";
}

function lessonId(moduleNumber: number, lessonNumber: number): string {
  return `m${moduleNumber}l${lessonNumber}`;
}

// Parse lesson-code references (e.g. "3.2", "7.1") from a text field.
const LESSON_CODE_RE = /\b(\d{1,2})\.(\d{1,2})\b/g;

function extractLessonCodes(text: string): string[] {
  const codes: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = LESSON_CODE_RE.exec(text)) !== null) {
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
  source: string;
  target: string;
  sourceCode: string;
  targetCode: string;
  type: "reference" | "sequence";
}

// GET /api/graph?lang=en|es
// DB-free: nodes from SYLLABUS, reference edges from LESSON_CONTENT.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = pickLang(url.searchParams);

  // Flatten all lessons with stable IDs.
  const flat: {
    id: string;
    lessonCode: string;
    concept: string;
    moduleNumber: number;
    accent: string;
    vector: string;
    status: string;
    globalOrder: number;
  }[] = [];

  const byCode = new Map<string, { id: string; lessonCode: string }>();

  for (const m of SYLLABUS) {
    for (const l of m.lessons) {
      const id = lessonId(m.number, l.number);
      flat.push({
        id,
        lessonCode: l.lessonCode,
        concept: l.concept,
        moduleNumber: m.number,
        accent: m.accent,
        vector: l.vector,
        status: l.status,
        globalOrder: l.globalOrder,
      });
      byCode.set(l.lessonCode, { id, lessonCode: l.lessonCode });
    }
  }

  flat.sort((a, b) => a.globalOrder - b.globalOrder);

  const nodes: GraphNode[] = flat.map((l) => ({
    ...l,
    completed: false, // client-side
    hasContent: !!LESSON_CONTENT[l.lessonCode],
  }));

  const edges: GraphEdge[] = [];
  const edgeSet = new Set<string>();

  const addEdge = (
    sourceId: string,
    sourceCode: string,
    targetCode: string
  ) => {
    const target = byCode.get(targetCode);
    if (!target || target.id === sourceId) return;
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

  // 1. Reference edges from pre-written connectionNode content.
  for (const l of flat) {
    const content = LESSON_CONTENT[l.lessonCode];
    if (!content?.connectionNode) continue;
    for (const code of extractLessonCodes(content.connectionNode)) {
      addEdge(l.id, l.lessonCode, code);
    }
  }

  // 2. Sequential edges.
  for (let i = 0; i < flat.length - 1; i++) {
    const cur = flat[i];
    const nxt = flat[i + 1];
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
