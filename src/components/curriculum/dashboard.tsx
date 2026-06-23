"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/use-app";
import { ProgressRing } from "./progress-ring";
import {
  VECTOR_META,
  STATUS_META,
  getAccent,
  type ModuleMeta,
  type Vector,
  type LessonStatus,
} from "@/lib/accents";
import {
  ArrowRight,
  Check,
  Layers,
  Eye,
  Sparkles,
  Leaf,
  Compass,
  X,
  AlertTriangle,
  BookOpen,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

const VECTOR_ICONS: Record<Vector, React.ElementType> = {
  critical: Eye,
  materialist: Layers,
  phenomenological: Sparkles,
  ecological: Leaf,
};

export function Dashboard() {
  const syllabus = useApp((s) => s.syllabus);
  const openModule = useApp((s) => s.openModule);
  const openLesson = useApp((s) => s.openLesson);
  const firstIncomplete = useApp((s) => s.firstIncomplete);
  const { t } = useT();

  if (!syllabus) return null;

  const pct = syllabus.totalLessons
    ? syllabus.completed / syllabus.totalLessons
    : 0;
  const next = firstIncomplete();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-8 sm:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {t("dash.eyebrow")}
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("dash.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("dash.subtitle")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => next && openLesson(next.id)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:opacity-90"
              >
                {syllabus.completed > 0 ? t("dash.continue") : t("dash.begin")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="text-sm text-muted-foreground">
                {next ? (
                  <>
                    {t("dash.next")}{" "}
                    <span className="text-foreground">{next.lessonCode}</span>{" "}
                    {next.concept}
                  </>
                ) : null}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <ProgressRing
              value={pct}
              size={148}
              stroke={9}
              color="oklch(0.7 0.13 70)"
              label={`${Math.round(pct * 100)}%`}
              sublabel={t("dash.complete")}
            />
            <p className="text-center text-xs text-muted-foreground">
              <span className="tabular-nums text-foreground">
                {syllabus.completed}
              </span>{" "}
              {t("dash.of")}{" "}
              <span className="tabular-nums">
                {syllabus.totalLessons}
              </span>{" "}
              {t("dash.lessons")}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Read this first — dismissible callout for new learners */}
      {syllabus.completed === 0 && <ReadThisFirst />}

      {/* Four integrated vectors */}
      <section className="mt-14">
        <SectionLabel
          eyebrow={t("dash.vectors.eyebrow")}
          title={t("dash.vectors.title")}
          description={t("dash.vectors.desc")}
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(VECTOR_META) as Vector[]).map((v, i) => {
            const meta = VECTOR_META[v];
            const Icon = VECTOR_ICONS[v];
            return (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: meta.hex }}
                />
                <Icon
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  style={{ color: meta.hex }}
                />
                <h3 className="mt-3 text-sm font-medium leading-tight">
                  {t(meta.labelKey)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {t(meta.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The 8-module spine */}
      <section className="mt-14">
        <SectionLabel
          eyebrow={t("dash.journey.eyebrow")}
          title={t("dash.journey.title")}
          description={t("dash.journey.desc")}
        />
        <div className="mt-6 space-y-2.5">
          {syllabus.modules.map((m, i) => (
            <ModuleRow
              key={m.id}
              module={m}
              index={i}
              onOpen={() => openModule(m.id)}
            />
          ))}
        </div>
      </section>

      {/* How to read this curriculum */}
      <HowToRead />

      {/* Acknowledgment */}
      <section className="mt-14">
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-7 sm:p-9">
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {t("ack.eyebrow")}
          </p>
          <p className="max-w-3xl font-display text-lg italic leading-relaxed text-foreground/80">
            {t("ack.body")}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t("ack.footer")}
          </p>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="h-px w-6 bg-muted-foreground/40" />
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

function ModuleRow({
  module: m,
  index,
  onOpen,
}: {
  module: ModuleMeta;
  index: number;
  onOpen: () => void;
}) {
  const accent = getAccent(m.accent);
  const { t } = useT();
  const done = m.lessons.filter((l) => l.completed).length;
  const total = m.lessons.length;
  const allDone = done === total;

  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      onClick={onOpen}
      className={cn(
        "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border bg-card px-4 py-4 text-left transition-all sm:px-5",
        "border-border/60 hover:border-border hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      )}
    >
      <span
        className={cn("absolute inset-y-0 left-0 w-1", accent.chip)}
        aria-hidden
      />

      <div className="flex w-10 shrink-0 items-center justify-center sm:w-12">
        <span className="font-display text-2xl font-medium tabular-nums text-muted-foreground/70 sm:text-3xl">
          {m.number}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium leading-tight">{m.title}</h3>
          {allDone && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
              <Check className="h-3 w-3" /> {t("dash.done")}
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground sm:text-sm">
          {m.theme}
        </p>
      </div>

      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        <div className="text-right">
          <div className="text-xs tabular-nums text-muted-foreground">
            {done}/{total}
          </div>
          <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full", accent.chip)}
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
    </motion.button>
  );
}

// Dismissible "Read this first" callout for new learners.
function ReadThisFirst() {
  const [dismissed, setDismissed] = React.useState(false);
  const { t } = useT();
  React.useEffect(() => {
    try {
      setDismissed(localStorage.getItem("ra:readFirstDismissed") === "1");
    } catch {
      /* ignore */
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("ra:readFirstDismissed", "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-6 sm:p-7"
    >
      <button
        onClick={dismiss}
        aria-label={t("readFirst.dismiss")}
        className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-amber-500/15 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
            {t("readFirst.label")}
          </p>
          <p className="prose-reader mt-2 text-sm leading-relaxed text-foreground/90">
            {t("readFirst.body")}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {t("readFirst.footer")}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

// Practical guidance on how to read the curriculum.
function HowToRead() {
  const { t } = useT();
  const cards = [
    { icon: BookOpen, title: t("howto.1.title"), body: t("howto.1.body") },
    { icon: ScanSearch, title: t("howto.2.title"), body: t("howto.2.body") },
    { icon: AlertTriangle, title: t("howto.3.title"), body: t("howto.3.body") },
    { icon: Compass, title: t("howto.4.title"), body: t("howto.4.body") },
  ];

  return (
    <section className="mt-14">
      <SectionLabel
        eyebrow={t("howto.eyebrow")}
        title={t("howto.title")}
        description={t("howto.desc")}
      />

      {/* Contestation legend */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(STATUS_META) as LessonStatus[]).map((s) => {
          const m = STATUS_META[s];
          return (
            <span
              key={s}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                m.badge
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
              {t(m.labelKey)}
            </span>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-border/60 bg-card p-5"
          >
            <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="mt-2.5 text-sm font-medium leading-tight">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
