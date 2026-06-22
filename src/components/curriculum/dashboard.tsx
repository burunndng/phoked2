"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/use-app";
import { ProgressRing } from "./progress-ring";
import {
  VECTOR_META,
  getAccent,
  type ModuleMeta,
  type Vector,
} from "@/lib/accents";
import {
  ArrowRight,
  Check,
  Layers,
  Eye,
  Sparkles,
  Leaf,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
              Definitive Edition v3.0
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Understanding{" "}
              <span className="italic text-amber-600 dark:text-amber-400">
                Reality&apos;s
              </span>{" "}
              Architecture
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seventy-six lessons across ten weeks. A daily micro-session
              through epistemics, cognition, social construction, power,
              complexity, political economy, the digital paradigm — and the
              praxis of holding them all at once.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => next && openLesson(next.id)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:opacity-90"
              >
                {syllabus.completed > 0 ? "Continue" : "Begin the journey"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="text-sm text-muted-foreground">
                {next ? (
                  <>
                    Next:{" "}
                    <span className="text-foreground">{next.lessonCode}</span>{" "}
                    {next.concept}
                  </>
                ) : (
                  "Curriculum complete."
                )}
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
              sublabel="complete"
            />
            <p className="text-center text-xs text-muted-foreground">
              <span className="tabular-nums text-foreground">
                {syllabus.completed}
              </span>{" "}
              of{" "}
              <span className="tabular-nums">
                {syllabus.totalLessons}
              </span>{" "}
              lessons
            </p>
          </div>
        </div>
      </motion.section>

      {/* Four integrated vectors */}
      <section className="mt-14">
        <SectionLabel
          eyebrow="Four integrated vectors"
          title="Running throughout, not bolted on"
          description="Each lesson leads with one vector and lets the others breathe at the margins. Together they prevent the curriculum from collapsing into a single register."
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
                  {meta.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {meta.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The 8-module spine */}
      <section className="mt-14">
        <SectionLabel
          eyebrow="The journey"
          title="Eight modules, one architecture"
          description="The sequence moves from who is knowing, through how collectives construct reality and how power operates, to the praxis of navigating it all."
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

      {/* Acknowledgment */}
      <section className="mt-14">
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-7 sm:p-9">
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            What this version still cannot see
          </p>
          <p className="max-w-3xl font-display text-lg italic leading-relaxed text-foreground/80">
            Aesthetic and artistic knowledge is absent. Queer theory beyond
            Butler is thin. Non-Western systems thought appears at the margins.
            The body at scale — trauma, somatic politics, disability — is
            underrepresented.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            These are not defects to be embarrassed by. They are the next
            iteration&apos;s brief.
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
              <Check className="h-3 w-3" /> done
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
