"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/use-app";
import { getAccent, VECTOR_META } from "@/lib/accents";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LessonResponse {
  id: string;
  lessonCode: string;
  concept: string;
  originators: string;
  coreClaim: string;
  vector: string;
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
  const findLesson = useApp((s) => s.findLesson);
  const goDashboard = useApp((s) => s.goDashboard);
  const openLesson = useApp((s) => s.openLesson);
  const nextLesson = useApp((s) => s.nextLesson);
  const prevLesson = useApp((s) => s.prevLesson);
  const toggleComplete = useApp((s) => s.toggleComplete);

  const [data, setData] = React.useState<LessonResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [reflection, setReflection] = React.useState("");
  const [savingReflection, setSavingReflection] = React.useState(false);
  const reflectionTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  const meta = lessonId ? findLesson(lessonId) : undefined;

  const load = React.useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/lesson?id=${encodeURIComponent(id)}`);
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
    // scroll to top on new lesson
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  React.useEffect(() => {
    if (lessonId) load(lessonId);
  }, [lessonId, load]);

  // debounce-save reflection
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
          <span className="hidden sm:inline">Dashboard</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={cn("rounded-md px-2 py-0.5 font-medium", accent.soft, accent.text)}>
            {meta.module.number}.{meta.lesson.number}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline truncate max-w-[200px]">
            {meta.module.title}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <ComposingState
            key="loading"
            concept={meta.lesson.concept}
            originators={meta.lesson.originators}
            lessonCode={meta.lesson.lessonCode}
          />
        ) : error ? (
          <ErrorState key="error" message={error} onRetry={() => load(lessonId!)} />
        ) : data ? (
          <motion.article
            key={data.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <header className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Lesson {data.lessonCode}
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                {data.concept}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.originators}
              </p>
              <div
                className="rule-accent mt-5 w-full"
                style={{ "--accent-color": accent.hex } as React.CSSProperties}
              />
            </header>

            {/* Core Claim — the thesis */}
            <Section icon={Sparkles} label="Core Claim" accentHex={accent.hex}>
              <p className="prose-reader text-lg font-medium leading-relaxed text-foreground">
                {data.content.coreClaim}
              </p>
            </Section>

            {/* Mechanism */}
            <Section icon={Cpu} label="Mechanism" accentHex={accent.hex}>
              <Prose text={data.content.mechanism} />
            </Section>

            {/* Canonical Example */}
            <Section
              icon={FlaskConical}
              label="Canonical Example"
              accentHex={accent.hex}
              hint="post-2020"
            >
              <Prose text={data.content.canonicalExample} />
            </Section>

            {/* Conceptual Tension */}
            <Section icon={Split} label="Conceptual Tension" accentHex={accent.hex}>
              <Prose text={data.content.conceptualTension} />
            </Section>

            {/* Connection Node */}
            <Section icon={Link2} label="Connection Node" accentHex={accent.hex}>
              <Prose text={data.content.connectionNode} onLessonCode={openLesson} />
            </Section>

            {/* Micro-Praxis */}
            <div className="my-8 overflow-hidden rounded-xl border border-dashed border-border bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
                <Timer className="h-4 w-4" style={{ color: accent.hex }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                  Micro-Praxis
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                  90 seconds
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
                Zeigarnik Hook
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
                  Private reflection
                </label>
                {savingReflection && (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> saving
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
                placeholder="What landed? What resists? What does this make visible that was invisible a moment ago?"
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
                      ? "Lesson complete"
                      : "Marked incomplete",
                    description: willComplete
                      ? `${data.lessonCode} marked as complete.`
                      : undefined,
                  });
                }}
                className={cn(
                  "gap-2",
                  data.completed && "bg-emerald-600 text-white hover:bg-emerald-700"
                )}
              >
                {data.completed ? (
                  <>
                    <Check className="h-4 w-4" /> Completed
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" /> Mark complete
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
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!next}
                  onClick={() => next && openLesson(next.id)}
                  className="gap-1.5"
                >
                  <span className="hidden sm:inline">Next</span>
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
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: accentHex }} />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
        {hint && (
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
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
  // We need the syllabus to map lesson codes to ids.
  const syllabus = useApp((s) => s.syllabus);

  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  const renderParagraph = (p: string, i: number) => {
    // split on lesson code references like 1.4 or 8.8 (max 2 digits each side)
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

  return <div className="prose-reader text-foreground/90">{paragraphs.map(renderParagraph)}</div>;
}

function ComposingState({
  concept,
  originators,
  lessonCode,
}: {
  concept: string;
  originators: string;
  lessonCode: string;
}) {
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
          Composing lesson {lessonCode}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
          {concept}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{originators}</p>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Each session is composed on demand — mechanism, canonical example,
          the tension that keeps it alive, and a practice you can do in ninety
          seconds.
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-16 text-center"
    >
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button onClick={onRetry} variant="outline" className="mt-4 gap-2">
        <RotateCw className="h-4 w-4" /> Retry
      </Button>
    </motion.div>
  );
}
