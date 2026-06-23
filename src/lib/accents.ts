// Shared client-side types and the module accent system.
// Accents are written out explicitly so Tailwind keeps every class.

export type Vector = "critical" | "materialist" | "phenomenological" | "ecological";

export type LessonStatus = "settled" | "contested" | "actively-debated";

export interface LessonMeta {
  id: string;
  lessonCode: string;
  number: number;
  globalOrder: number;
  concept: string;
  keyFigures: string;
  coreClaim: string;
  vector: Vector;
  status: LessonStatus;
  criticalNote?: string | null;
  hasContent: boolean;
  completed: boolean;
}

export interface ModuleMeta {
  id: string;
  number: number;
  title: string;
  theme: string;
  description: string;
  accent: Accent;
  lessons: LessonMeta[];
}

export interface SyllabusData {
  totalLessons: number;
  completed: number;
  modules: ModuleMeta[];
}

export type Accent =
  | "amber"
  | "rose"
  | "teal"
  | "red"
  | "emerald"
  | "orange"
  | "violet"
  | "stone";

export interface AccentStyle {
  /** primary text */
  text: string;
  /** soft tinted background */
  soft: string;
  /** soft tinted background, stronger */
  softStrong: string;
  /** border */
  border: string;
  /** ring on focus */
  ring: string;
  /** solid dot / chip background */
  chip: string;
  /** gradient for headers */
  gradient: string;
  /** hex used for inline svgs / canvas */
  hex: string;
  hexDark: string;
}

export const ACCENTS: Record<Accent, AccentStyle> = {
  amber: {
    text: "text-amber-700 dark:text-amber-400",
    soft: "bg-amber-50 dark:bg-amber-950/40",
    softStrong: "bg-amber-100 dark:bg-amber-900/40",
    border: "border-amber-200 dark:border-amber-900/60",
    ring: "ring-amber-300 dark:ring-amber-700",
    chip: "bg-amber-600 dark:bg-amber-500",
    gradient: "from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/20",
    hex: "#d97706",
    hexDark: "#fbbf24",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-400",
    soft: "bg-rose-50 dark:bg-rose-950/40",
    softStrong: "bg-rose-100 dark:bg-rose-900/40",
    border: "border-rose-200 dark:border-rose-900/60",
    ring: "ring-rose-300 dark:ring-rose-700",
    chip: "bg-rose-600 dark:bg-rose-500",
    gradient: "from-rose-100 to-rose-50 dark:from-rose-950/50 dark:to-rose-900/20",
    hex: "#e11d48",
    hexDark: "#fb7185",
  },
  teal: {
    text: "text-teal-700 dark:text-teal-400",
    soft: "bg-teal-50 dark:bg-teal-950/40",
    softStrong: "bg-teal-100 dark:bg-teal-900/40",
    border: "border-teal-200 dark:border-teal-900/60",
    ring: "ring-teal-300 dark:ring-teal-700",
    chip: "bg-teal-600 dark:bg-teal-500",
    gradient: "from-teal-100 to-teal-50 dark:from-teal-950/50 dark:to-teal-900/20",
    hex: "#0d9488",
    hexDark: "#2dd4bf",
  },
  red: {
    text: "text-red-700 dark:text-red-400",
    soft: "bg-red-50 dark:bg-red-950/40",
    softStrong: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-200 dark:border-red-900/60",
    ring: "ring-red-300 dark:ring-red-700",
    chip: "bg-red-600 dark:bg-red-500",
    gradient: "from-red-100 to-red-50 dark:from-red-950/50 dark:to-red-900/20",
    hex: "#dc2626",
    hexDark: "#f87171",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-400",
    soft: "bg-emerald-50 dark:bg-emerald-950/40",
    softStrong: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-200 dark:border-emerald-900/60",
    ring: "ring-emerald-300 dark:ring-emerald-700",
    chip: "bg-emerald-600 dark:bg-emerald-500",
    gradient: "from-emerald-100 to-emerald-50 dark:from-emerald-950/50 dark:to-emerald-900/20",
    hex: "#059669",
    hexDark: "#34d399",
  },
  orange: {
    text: "text-orange-700 dark:text-orange-400",
    soft: "bg-orange-50 dark:bg-orange-950/40",
    softStrong: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-200 dark:border-orange-900/60",
    ring: "ring-orange-300 dark:ring-orange-700",
    chip: "bg-orange-600 dark:bg-orange-500",
    gradient: "from-orange-100 to-orange-50 dark:from-orange-950/50 dark:to-orange-900/20",
    hex: "#ea580c",
    hexDark: "#fb923c",
  },
  violet: {
    text: "text-violet-700 dark:text-violet-400",
    soft: "bg-violet-50 dark:bg-violet-950/40",
    softStrong: "bg-violet-100 dark:bg-violet-900/40",
    border: "border-violet-200 dark:border-violet-900/60",
    ring: "ring-violet-300 dark:ring-violet-700",
    chip: "bg-violet-600 dark:bg-violet-500",
    gradient: "from-violet-100 to-violet-50 dark:from-violet-950/50 dark:to-violet-900/20",
    hex: "#7c3aed",
    hexDark: "#a78bfa",
  },
  stone: {
    text: "text-stone-700 dark:text-stone-300",
    soft: "bg-stone-100 dark:bg-stone-800/50",
    softStrong: "bg-stone-200 dark:bg-stone-800/70",
    border: "border-stone-300 dark:border-stone-700",
    ring: "ring-stone-400 dark:ring-stone-600",
    chip: "bg-stone-600 dark:bg-stone-500",
    gradient: "from-stone-200 to-stone-100 dark:from-stone-800/60 dark:to-stone-800/30",
    hex: "#57534e",
    hexDark: "#a8a29e",
  },
};

export const VECTOR_META: Record<
  Vector,
  {
    labelKey: string;
    shortKey: string;
    descKey: string;
    hex: string;
  }
> = {
  critical: {
    labelKey: "vector.critical.label",
    shortKey: "vector.critical.short",
    descKey: "vector.critical.desc",
    hex: "#dc2626",
  },
  materialist: {
    labelKey: "vector.materialist.label",
    shortKey: "vector.materialist.short",
    descKey: "vector.materialist.desc",
    hex: "#ea580c",
  },
  phenomenological: {
    labelKey: "vector.phenomenological.label",
    shortKey: "vector.phenomenological.short",
    descKey: "vector.phenomenological.desc",
    hex: "#7c3aed",
  },
  ecological: {
    labelKey: "vector.ecological.label",
    shortKey: "vector.ecological.short",
    descKey: "vector.ecological.desc",
    hex: "#059669",
  },
};

export function getAccent(accent: string): AccentStyle {
  return ACCENTS[accent as Accent] ?? ACCENTS.stone;
}

// Contestation status metadata — the visual + textual treatment for the
// per-lesson contestation badge (critical review's central recommendation).
export const STATUS_META: Record<
  LessonStatus,
  {
    labelKey: string;
    descKey: string;
    /** tailwind classes for the badge */
    badge: string;
    dot: string;
    /** hex for the icon/dot */
    hex: string;
  }
> = {
  settled: {
    labelKey: "status.settled.label",
    descKey: "status.settled.desc",
    badge:
      "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
    dot: "bg-emerald-500",
    hex: "#10b981",
  },
  contested: {
    labelKey: "status.contested.label",
    descKey: "status.contested.desc",
    badge:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    dot: "bg-amber-500",
    hex: "#f59e0b",
  },
  "actively-debated": {
    labelKey: "status.actively-debated.label",
    descKey: "status.actively-debated.desc",
    badge:
      "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
    dot: "bg-red-500",
    hex: "#ef4444",
  },
};

