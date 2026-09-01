// Lesson composer: the anti-formula rulebook + LLM orchestration.
// The quality of every regenerated lesson lives or dies by SYSTEM_PROMPT here.

import type { Provider } from "./providers";

export interface LessonContent {
  coreClaim: string;
  mechanism: string;
  canonicalExample: string;
  conceptualTension: string;
  connectionNode: string;
  microPraxis: string;
  zeigarnikHook: string;
}

export interface Assignment {
  /** era the canonical example must come from (e.g. "1996–2008") */
  era: string;
  /** micro-praxis format, must differ across lessons */
  praxis: string;
  /** when the reader does the exercise — varies, never "90 seconds" */
  duration: string;
  /** domain hint to steer the example away from clichés */
  exampleHint: string;
}

export interface LessonContext {
  lessonCode: string;
  concept: string;
  keyFigures: string;
  coreClaim: string;
  vector: string;
  status: string;
  criticalNote?: string | null;
  moduleTitle: string;
  moduleTheme: string;
  priorLessons: { lessonCode: string; concept: string }[];
  assignment: Assignment;
  /** previous example topic(s) to avoid reusing in this batch */
  usedExamples: string[];
}

// ── Deterministic diversity assignments ──────────────────────────────
// Era / praxis / duration rotate by global order so a module never
// clusters on one decade or one exercise format.

const ERA_POOL = [
  "1955–1975",
  "1976–1995",
  "1996–2008",
  "2009–2015",
  "2016–2020",
  "2021–2025",
];

const PRAXIS_POOL = [
  "somatic (breath or body awareness)",
  "sensory (look at or listen to something real, in the room or outside)",
  "observational (watch a real situation unfold and notice one thing)",
  "conversational (ask one person one precise question)",
  "writing (at most 3 sentences, with a specific constraint)",
  "mental-model (imagine or visualize a concrete scenario)",
  "fieldwork (go to a specific place or open a specific object)",
];

const DURATION_POOL = [
  "right now, in the time it takes to read the field once more",
  "in the next ten minutes",
  "before you go to sleep tonight",
  "on your next walk or commute",
  "at your next meal",
  "in your next conversation",
  "before you next open a screen",
];

// Per-lesson overrides where the rotation would pick something flat.
// Keyed by lesson code.
const ASSIGNMENT_OVERRIDES: Record<string, Partial<Assignment>> = {
  "1.1": {
    era: "1980–2005",
    praxis: "observational",
    duration: "at your next meeting or gathering you attend",
    exampleHint:
      "a documented institutional episode where knowledge from a marginalized group was dismissed and later vindicated (labor, medicine, or environmental science)",
  },
  "1.2": {
    era: "1962–1998",
    praxis: "mental-model",
    duration: "in the next ten minutes",
    exampleHint:
      "a real scientific controversy that forced a field to reorganize (physics, geology, or medicine)",
  },
  "1.3": {
    era: "1970–2010",
    praxis: "conversational",
    duration: "in your next conversation",
    exampleHint:
      "a concrete historical shift in what a discipline counted as knowledge (psychiatry, economics, or natural history)",
  },
  "1.4": {
    era: "1996–2018",
    praxis: "sensory",
    duration: "right now, with an object on your desk or a map on your screen",
    exampleHint:
      "a real case where a model or metric was mistaken for the thing it measured (finance, cartography, or public policy)",
  },
  "1.5": {
    era: "1985–2010",
    praxis: "mental-model",
    duration: "in the next ten minutes",
    exampleHint:
      "a real screening or diagnostic case where base rates were ignored (medicine or criminology)",
  },
  "1.6": {
    era: "1989–2011",
    praxis: "writing",
    duration: "before you go to sleep tonight",
    exampleHint:
      "a real scientific claim that failed a decisive test, or that survived one (physics or biomedicine)",
  },
  "1.7": {
    era: "1927–2022",
    praxis: "mental-model",
    duration: "in the next ten minutes",
    exampleHint:
      "a real case where two theories fit the same evidence and the tie was broken by non-evidential factors",
  },
  "1.8": {
    era: "1990–2016",
    praxis: "writing",
    duration: "before you go to sleep tonight",
    exampleHint:
      "a real re-reading or re-translation that changed what a text was taken to mean",
  },
  "1.9": {
    era: "2010–2023",
    praxis: "fieldwork",
    duration: "on your next walk or commute",
    exampleHint:
      "a documented case of Indigenous-led land or fire management being formally integrated into state practice",
  },
  "1.10": {
    era: "2020–2023",
    praxis: "writing",
    duration: "in the next ten minutes",
    exampleHint:
      "a recent materials-science or policy claim where the mechanism was invoked without being demonstrated",
  },
};

export function assignmentFor(
  globalOrder: number,
  lessonCode: string
): Assignment {
  const override = ASSIGNMENT_OVERRIDES[lessonCode] ?? {};
  const i = globalOrder - 1;
  return {
    era: override.era ?? ERA_POOL[i % ERA_POOL.length],
    praxis: override.praxis ?? PRAXIS_POOL[i % PRAXIS_POOL.length],
    duration: override.duration ?? DURATION_POOL[i % DURATION_POOL.length],
    exampleHint: override.exampleHint ?? "a real, dated, verifiable event or publication",
  };
}

// ── The rulebook ─────────────────────────────────────────────────────

const SYSTEM_PROMPT = [
  "You are a senior editor and writer for a rigorous interdisciplinary micro-learning curriculum called 'Understanding Reality's Architecture' — a 76-lesson journey through epistemics, cognition, social construction, power, complexity, political economy, the digital paradigm, and integrative praxis.",
  "",
  "The audience is a thoughtful adult learner who reads serious nonfiction and will sit with difficulty. Voice: plain, accurate, explanatory prose — the register of a good nonfiction writer explaining to a curious reader, not marketing copy. Write patient explanations. Vary sentence length. Use 'we' or 'you' sparingly and naturally.",
  "",
  "VOICE RULES (the text must read like a human explaining, not a model performing):",
  "- Avoid aphoristic one-line zingers at paragraph ends.",
  "- Avoid chiasmus and slogan constructions ('not X but Y', 'The X is not a defect; it is the point').",
  "- Do not stack short rhetorical sentences for effect.",
  "- Limit em-dashes; prefer plain coordination and subordination.",
  "- When in doubt, explain more plainly. A fact explained patiently beats an insight packaged as a slogan.",
  "",
  "Compose ONE lesson following a mandatory seven-part structure. Respond with VALID JSON ONLY — no markdown fences, no preamble. Exactly these keys:",
  "coreClaim, mechanism, canonicalExample, conceptualTension, connectionNode, microPraxis, zeigarnikHook",
  "",
  "RULES OF CRAFT (load-bearing; violations are rejected):",
  "",
  "1. CONCRETE OVER ABSTRACT. Named scholars, named papers, named dates, named places. No floating abstractions ('society', 'the modern condition') without a specific anchor.",
  "",
  "2. CANONICAL EXAMPLE — the highest bar in the lesson:",
  "   - ONE real, dated, verifiable event, case, experiment, or publication. Name it specifically: who, what, when, where.",
  "   - The assigned era is given in your instructions; the example must fall inside it.",
  "   - Then explain briefly HOW the example demonstrates the concept — not merely that it exists.",
  "   - FORBIDDEN: COVID-19 pandemic examples; 'The 2020s' as a vague decade gesture; smartphones, GPS, and social-media feeds as examples; an example that is really a trend description instead of an event.",
  "",
  "3. MICRO-PRAXIS — one short exercise the reader can do immediately:",
  "   - The format and moment are assigned in your instructions (they rotate between lessons and MUST differ from lesson to lesson).",
  "   - FORBIDDEN: the phrases 'For ninety seconds', 'List three', 'Take a belief you hold'. The exercise must fit the assigned format, not default to a writing prompt.",
  "",
  "4. CONCEPTUAL TENSION — name REAL critics or rival positions with the actual substance of the dispute, never 'some scholars disagree'. Honor the contestation status and critical note. FORBIDDEN: the phrase 'The honest reading', and 'is contested but' as the only gesture toward the debate.",
  "",
  "5. ZEIGARNIK HOOK — one genuinely unresolved question specific to THIS concept, not generic skepticism. Vary the construction (not every hook may be 'If X, what does Y mean?'). No answers, no resolution.",
  "",
  "6. MECHANISM — a precise pointer to the operative logic: name the moving parts, and where useful the primary source to consult for the full account. It is a POINTER, not a full exposition; do not pretend to exhaust the topic.",
  "",
  "7. CONNECTION NODE — explicitly cross-link to at least 2 PRIOR lessons from the provided list, by lesson code AND concept. Write it as a narrative bridge, not a bullet list.",
  "",
  "8. STYLE BANS (any appearance is a rejection):",
  "   'For ninety seconds', 'The honest reading', 'not a glitch', 'in real time', 'The point is', 'In conclusion', bullet lists inside fields, hedge-chains ('some argue… others argue… still others'), and any sentence template repeated twice in a row.",
  "",
  "9. DEPTH IS FLEXIBLE: not every lesson needs the same depth or the same number of examples. Some concepts justify a long, patient exposition with a second contrast case; others are best served by one tight example and a shorter treatment. But always err on the side of OVEREXPLAINING. A reader should never finish a section confused about what was claimed; when the choice is between leaving something implicit and spelling it out, spell it out.",
  "",
  "10. INTELLECTUAL HONESTY: 'Key Figures' are heuristic orientation, not citation-grade — if the critical note flags a conflation or dissent, honor it. For contested or actively-debated lessons, the TENSION must foreground the real debate.",
  "",
  "Use \\n\\n for paragraph breaks within a field. Do not invent keys.",
].join("\n");

const VECTOR_LABEL: Record<string, string> = {
  critical: "Critical/Structural",
  materialist: "Materialist/Formal",
  phenomenological: "Phenomenological/Contemplative",
  ecological: "Ecological/More-than-human",
};

export function buildUserPrompt(ctx: LessonContext): string {
  const prior = ctx.priorLessons
    .map((p) => `- ${p.lessonCode} "${p.concept}"`)
    .join("\n");

  const statusLine =
    ctx.status === "settled"
      ? "CONTESTATION STATUS: settled (broadly stable; note live edges in the TENSION where honest)."
      : ctx.status === "contested"
      ? "CONTESTATION STATUS: contested. The CONCEPTUAL TENSION section MUST foreground the real debate (see critical note)."
      : "CONTESTATION STATUS: actively-debated. The framing itself is live-disputed; the TENSION must name the dispute and the dissenting positions.";

  const noteLine = ctx.criticalNote
    ? `\nCRITICAL NOTE (honor this in the TENSION section; do not contradict it): ${ctx.criticalNote}`
    : "";

  const avoidLine = ctx.usedExamples.length
    ? `\nCANONICAL EXAMPLES ALREADY USED IN THIS BATCH — do NOT reuse these topics: ${ctx.usedExamples.join(" | ")}`
    : "";

  return [
    `Compose lesson ${ctx.lessonCode}.`,
    "",
    "OUTPUT LANGUAGE: English.",
    "",
    `MODULE: ${ctx.moduleTitle}`,
    `MODULE THEME: ${ctx.moduleTheme}`,
    `PRIMARY VECTOR: ${VECTOR_LABEL[ctx.vector] ?? ctx.vector}`,
    "",
    `CONCEPT: ${ctx.concept}`,
    `KEY FIGURES (heuristic, not citation-grade): ${ctx.keyFigures}`,
    `CORE CLAIM (from syllabus — refine but do not contradict): ${ctx.coreClaim}`,
    statusLine + noteLine,
    "",
    `CANONICAL EXAMPLE — REQUIRED ERA: ${ctx.assignment.era}. DOMAIN HINT: ${ctx.assignment.exampleHint}.`,
    `MICRO-PRAXIS — REQUIRED FORMAT: ${ctx.assignment.praxis}. DO IT: ${ctx.assignment.duration}.`,
    avoidLine,
    "",
    "PRIOR LESSONS available for the CONNECTION NODE (cross-link to at least 2, by code and concept):",
    prior || "(none — this is the opening lesson; reference the curriculum's architecture instead)",
    "",
    "Return only the JSON object.",
  ].join("\n");
}

// ── Response handling & validation ───────────────────────────────────

export function extractJson(raw: string): LessonContent {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in LLM response");
  }
  const parsed = JSON.parse(text.slice(start, end + 1)) as Record<
    string,
    unknown
  >;

  const required: (keyof LessonContent)[] = [
    "coreClaim",
    "mechanism",
    "canonicalExample",
    "conceptualTension",
    "connectionNode",
    "microPraxis",
    "zeigarnikHook",
  ];
  for (const k of required) {
    if (typeof parsed[k] !== "string" || !(parsed[k] as string).trim()) {
      throw new Error(`Missing or invalid field: ${k}`);
    }
  }
  return parsed as unknown as LessonContent;
}

const BANNED_PHRASES = [
  "For ninety seconds",
  "for ninety seconds",
  "ninety seconds",
  "The honest reading",
  "not a glitch",
  "in real time",
  "The 2020s",
  "In conclusion",
];

const LESSON_CODE_RE = /\b(\d{1,2})\.(\d{1,2})\b/g;

export interface ValidationProblem {
  severity: "fail" | "warn";
  message: string;
}

export function validateLesson(
  content: LessonContent,
  ctx: LessonContext
): ValidationProblem[] {
  const problems: ValidationProblem[] = [];

  const total = Object.values(content).join(" ");
  const words = total.split(/\s+/).filter(Boolean).length;
  if (words < 200) {
    problems.push({ severity: "fail", message: `too short (${words} words)` });
  } else if (words > 750) {
    problems.push({ severity: "fail", message: `too long (${words} words)` });
  } else if (words < 300 || words > 650) {
    problems.push({ severity: "warn", message: `word count ${words} outside 380–560 target` });
  }

  for (const phrase of BANNED_PHRASES) {
    if (total.includes(phrase)) {
      problems.push({ severity: "fail", message: `banned phrase: "${phrase}"` });
    }
  }

  if (!/\b(19|20)\d\d\b/.test(content.canonicalExample)) {
    problems.push({
      severity: "fail",
      message: "canonicalExample contains no year",
    });
  }

  // connectionNode must cite valid PRIOR lesson codes.
  const codes = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = LESSON_CODE_RE.exec(content.connectionNode)) !== null) {
    codes.add(m[0]);
  }
  if (codes.size === 0) {
    problems.push({
      severity: "fail",
      message: "connectionNode cites no lesson codes",
    });
  }
  const priorCodes = new Set(ctx.priorLessons.map((p) => p.lessonCode));
  for (const code of codes) {
    if (!priorCodes.has(code)) {
      problems.push({
        severity: "warn",
        message: `connectionNode cites ${code}, which is not a prior lesson`,
      });
    }
  }

  return problems;
}

// ── Orchestration ────────────────────────────────────────────────────

export interface ComposeResult {
  content: LessonContent;
  attempts: number;
  problems: ValidationProblem[];
}

export async function composeLesson(
  provider: Provider,
  ctx: LessonContext
): Promise<ComposeResult> {
  let lastError: unknown = null;
  let lastContent: LessonContent | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await provider.complete(
        SYSTEM_PROMPT,
        buildUserPrompt(ctx)
      );
      const content = extractJson(raw);
      lastContent = content;
      const problems = validateLesson(content, ctx);
      if (!problems.some((p) => p.severity === "fail")) {
        return { content, attempts: attempt, problems };
      }
      lastError = new Error(
        `validation failed: ${problems
          .filter((p) => p.severity === "fail")
          .map((p) => p.message)
          .join("; ")}`
      );
    } catch (err) {
      lastError = err;
    }
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }

  if (lastContent) {
    const problems = validateLesson(lastContent, ctx);
    return { content: lastContent, attempts: 3, problems };
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to compose lesson");
}
