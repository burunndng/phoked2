"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/use-app";
import {
  getAccent,
  VECTOR_META,
  STATUS_META,
  type LessonStatus,
} from "@/lib/accents";
import type { LessonContent } from "@/lib/lesson-generator";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Sparkles,
  Link2,
  Timer,
  HelpCircle,
  FlaskConical,
  Split,
  Cpu,
  Loader2,
  RotateCw,
  AlertTriangle,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/hooks/use-t";
import type { Lang } from "@/lib/i18n";

interface LessonResponse {
  id: string;
  lessonCode: string;
  concept: string;
  keyFigures: string;
  coreClaim: string;
  vector: string;
  status: LessonStatus;
  criticalNote?: string | null;
  globalOrder: number;
  module: {
    id: string;
    number: number;
    title: string;
    theme: string;
    accent: string;
  };
  content: LessonContent;
  reflection: string;
  completed: boolean;
}

export function LessonReader() {
  const lessonId = useApp((s) => s.activeLessonId);
  const lang = useApp((s) => s.lang);
  const findLesson = useApp((s) => s.findLesson);
  const goDashboard = useApp((s) => s.goDashboard);
  const openLesson = useApp((s) => s.openLesson);
  const nextLesson = useApp((s) => s.nextLesson);
  const prevLesson = useApp((s) => s.prevLesson);
  const toggleComplete = useApp((s) => s.toggleComplete);
  const { t } = useT();

  const [data, setData] = React.useState<LessonResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [reflection, setReflection] = React.useState("");
  const [savingReflection, setSavingReflection] = React.useState(false);
  const reflectionTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const { toast } = useToast();

  const meta = lessonId ? findLesson(lessonId) : undefined;

  const load = React.useCallback(
    async (id: string, lng: Lang) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const res = await fetch(
          `/api/lesson?id=${encodeURIComponent(id)}&lang=${lng}`
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to load lesson");
        }
        const json: LessonResponse = await res.json();
        setData(json);
        setReflection(json.reflection ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    []
  );

  React.useEffect(() => {
    if (lessonId) load(lessonId, lang);
  }, [lessonId, lang, load]);

  const scheduleSave = React.useCallback(
    (text: string) => {
      if (!lessonId) return;
      if (reflectionTimer.current) clearTimeout(reflectionTimer.current);
      reflectionTimer.current = setTimeout(async () => {
        setSavingReflection(true);
        try {
          await fetch("/api/reflect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId, reflection: text }),
          });
        } finally {
          setSavingReflection(false);
        }
      }, 900);
    },
    [lessonId]
  );

  if (!meta) return null;
  const accent = getAccent(meta.module.accent);
  const statusMeta = STATUS_META[meta.lesson.status];

  const prev = prevLesson(lessonId!);
  const next = nextLesson(lessonId!);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* breadcrumb */}
      <div className="mb-8 flex items-center justify-between gap-3">
        <button
          onClick={goDashboard}
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">{t("nav.dashboard")}</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={cn(
              "rounded-md px-2 py-0.5 font-medium",
              accent.soft,
              accent.text
            )}
          >
            {meta.module.number}.{meta.lesson.number}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden max-w-[200px] truncate sm:inline">
            {meta.module.title}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <ComposingState
            key="loading"
            concept={meta.lesson.concept}
            keyFigures={meta.lesson.keyFigures}
            lessonCode={meta.lesson.lessonCode}
            status={meta.lesson.status}
          />
        ) : error ? (
          <ErrorState
            key="error"
            message={error}
            onRetry={() => load(lessonId!, lang)}
          />
        ) : data ? (
          <motion.article
            key={data.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("lesson.lesson")} {data.lessonCode}
                </p>
                {/* Contestation status badge — critical review's central rec */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                    statusMeta.badge
                  )}
                  title={t(statusMeta.descKey)}
                >
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", statusMeta.dot)}
                  />
                  {t(statusMeta.labelKey)}
                </span>
              </div>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                {data.concept}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <BookMarked className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-muted-foreground/70">{t("lesson.keyFigures")} · </span>
                  {data.keyFigures}
                </p>
              </div>
              <div
                className="rule-accent mt-5 w-full"
                style={
                  { "--accent-color": accent.hex } as React.CSSProperties
                }
              />
            </header>

            {/* Critical reading note — shown only for contested / actively-debated */}
            {data.criticalNote && data.status !== "settled" && (
              <div
                className={cn(
                  "mb-7 flex gap-3 rounded-xl border p-4",
                  data.status === "actively-debated"
                    ? "border-red-500/30 bg-red-500/[0.06]"
                    : "border-amber-500/30 bg-amber-500/[0.06]"
                )}
              >
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: statusMeta.hex }}
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("lesson.criticalReading")}
                  </p>
                  <p className="prose-reader mt-1 text-sm leading-relaxed text-foreground/90">
                    {data.criticalNote}
                  </p>
                </div>
              </div>
            )}

            {/* Core Claim — the thesis */}
            <Section icon={Sparkles} label={t("lesson.coreClaim")} accentHex={accent.hex}>
              <p className="prose-reader text-lg font-medium leading-relaxed text-foreground">
                {data.content.coreClaim}
              </p>
            </Section>

            {/* Mechanism — reframed as a pointer, not full depth */}
            <Section
              icon={Cpu}
              label={t("lesson.mechanism")}
              accentHex={accent.hex}
              hint={t("lesson.mechanism.hint")}
            >
              <Prose text={data.content.mechanism} />
            </Section>

            {/* Canonical Example */}
            <Section
              icon={FlaskConical}
              label={t("lesson.canonicalExample")}
              accentHex={accent.hex}
              hint={t("lesson.canonicalExample.hint")}
            >
              <Prose text={data.content.canonicalExample} />
            </Section>

            {/* Conceptual Tension */}
            <Section
              icon={Split}
              label={t("lesson.conceptualTension")}
              accentHex={accent.hex}
              hint={data.status !== "settled" ? t("lesson.conceptualTension.hint") : undefined}
            >
              <Prose text={data.content.conceptualTension} />
            </Section>

            {/* Connection Node */}
            <Section icon={Link2} label={t("lesson.connectionNode")} accentHex={accent.hex}>
              <Prose
                text={data.content.connectionNode}
                onLessonCode={openLesson}
              />
            </Section>

            {/* Micro-Praxis */}
            <div className="my-8 overflow-hidden rounded-xl border border-dashed border-border bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
                <Timer className="h-4 w-4" style={{ color: accent.hex }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                  {t("lesson.microPraxis")}
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("lesson.90seconds")}
                </span>
              </div>
              <div className="px-5 py-4">
                <Prose text={data.content.microPraxis} />
              </div>
            </div>

            {/* Zeigarnik Hook */}
            <div className="my-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <HelpCircle className="h-3.5 w-3.5" />
                {t("lesson.zeigarnikHook")}
              </div>
              <p className="mt-3 font-display text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
                {data.content.zeigarnikHook}
              </p>
            </div>

            {/* Reflection */}
            <div className="mt-10 rounded-xl border border-border/60 bg-card p-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="reflection"
                  className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {t("lesson.privateReflection")}
                </label>
                {savingReflection && (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> {t("lesson.saving")}
                  </span>
                )}
              </div>
              <Textarea
                id="reflection"
                value={reflection}
                onChange={(e) => {
                  setReflection(e.target.value);
                  scheduleSave(e.target.value);
                }}
                placeholder={t("lesson.reflectionPlaceholder")}
                className="min-h-[100px] resize-y border-0 bg-transparent p-0 text-sm leading-relaxed focus-visible:ring-0"
              />
            </div>

            {/* Complete + navigation */}
            <div className="mt-8 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant={data.completed ? "default" : "outline"}
                onClick={() => {
                  const willComplete = !data.completed;
                  toggleComplete(data.id, willComplete);
                  setData((d) =>
                    d ? { ...d, completed: willComplete } : d
                  );
                  toast({
                    title: willComplete
                      ? t("lesson.markedComplete")
                      : t("lesson.markedIncomplete"),
                    description: willComplete
                      ? `${data.lessonCode} ${t("lesson.markedCompleteDesc")}`
                      : undefined,
                  });
                }}
                className={cn(
                  "gap-2",
                  data.completed &&
                    "bg-emerald-600 text-white hover:bg-emerald-700"
                )}
              >
                {data.completed ? (
                  <>
                    <Check className="h-4 w-4" /> {t("lesson.completed")}
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" /> {t("lesson.markComplete")}
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!prev}
                  onClick={() => prev && openLesson(prev.id)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("lesson.prev")}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!next}
                  onClick={() => next && openLesson(next.id)}
                  className="gap-1.5"
                >
                  <span className="hidden sm:inline">{t("lesson.next")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  accentHex,
  hint,
  children,
}: {
  icon: React.ElementType;
  label: string;
  accentHex: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: accentHex }} />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
        {hint && (
          <span className="text-[10px] italic tracking-normal text-muted-foreground">
            · {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

// Renders prose with paragraph breaks, and turns lesson-code references
// (e.g. "1.4", "2.10") into clickable chips that navigate to that lesson.
function Prose({
  text,
  onLessonCode,
}: {
  text: string;
  onLessonCode?: (id: string) => void;
}) {
  const syllabus = useApp((s) => s.syllabus);

  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  const renderParagraph = (p: string, i: number) => {
    const parts = p.split(/(\d{1,2}\.\d{1,2})/g);
    return (
      <p key={i}>
        {parts.map((part, j) => {
          const m = /^(\d{1,2})\.(\d{1,2})$/.exec(part);
          if (m && syllabus && onLessonCode) {
            const code = part;
            const lesson = syllabus.modules
              .flatMap((mod) => mod.lessons)
              .find((l) => l.lessonCode === code);
            if (lesson) {
              return (
                <button
                  key={j}
                  onClick={() => onLessonCode(lesson.id)}
                  className="mx-0.5 inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-1.5 py-0.5 font-mono text-[0.8em] font-medium text-amber-700 transition-colors hover:bg-amber-500/25 dark:text-amber-400"
                >
                  <Link2 className="h-3 w-3" />
                  {code}
                </button>
              );
            }
          }
          return <React.Fragment key={j}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  return (
    <div className="prose-reader text-foreground/90">
      {paragraphs.map(renderParagraph)}
    </div>
  );
}

function ComposingState({
  concept,
  keyFigures,
  lessonCode,
  status,
}: {
  concept: string;
  keyFigures: string;
  lessonCode: string;
  status: LessonStatus;
}) {
  const statusMeta = STATUS_META[status];
  const { t } = useT();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 h-12 w-12">
          <div className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {t("lesson.composing")} {lessonCode}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
          {concept}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{keyFigures}</p>
        {status !== "settled" && (
          <span
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
              statusMeta.badge
            )}
          >
            <span
              className={cn("h-1.5 w-1.5 rounded-full", statusMeta.dot)}
            />
            {t(statusMeta.labelKey)}
          </span>
        )}
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t("lesson.composingBody")}
        </p>
        <div className="mt-8 w-full max-w-md space-y-3">
          {[90, 70, 80, 60].map((w, i) => (
            <div
              key={i}
              className="shimmer h-3 rounded-full"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const { t } = useT();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-16 text-center"
    >
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button onClick={onRetry} variant="outline" className="mt-4 gap-2">
        <RotateCw className="h-4 w-4" /> {t("lesson.retry")}
      </Button>
    </motion.div>
  );
}
