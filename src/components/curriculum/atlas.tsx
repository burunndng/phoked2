"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/use-app";
import { getAccent, type ModuleMeta } from "@/lib/accents";
import { Check, Circle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function Atlas() {
  const syllabus = useApp((s) => s.syllabus);
  const openLesson = useApp((s) => s.openLesson);
  const goDashboard = useApp((s) => s.goDashboard);

  if (!syllabus) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={goDashboard}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Dashboard
      </button>

      <div className="mb-10 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-6 bg-muted-foreground/40" />
          The Atlas
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          All seventy-six lessons
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The full architecture at a glance. Each cell is a lesson; each column
          is a module. Tap any cell to compose and read it.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {syllabus.modules.map((m) => (
          <ModuleColumn
            key={m.id}
            module={m}
            onOpenLesson={(id) => openLesson(id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500/20">
            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          </span>
          completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded border border-border/70">
            <Circle className="h-2.5 w-2.5 text-muted-foreground/60" />
          </span>
          not yet
        </span>
      </div>
    </div>
  );
}

function ModuleColumn({
  module: m,
  onOpenLesson,
}: {
  module: ModuleMeta;
  onOpenLesson: (id: string) => void;
}) {
  const accent = getAccent(m.accent);
  const done = m.lessons.filter((l) => l.completed).length;

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-1">
        <div className={cn("h-1 w-full rounded-full", accent.chip)} />
        <p className="mt-2 font-display text-2xl font-medium leading-none text-muted-foreground/60">
          {m.number}
        </p>
        <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          {done}/{m.lessons.length}
        </p>
      </div>

      <div className="space-y-1.5">
        {m.lessons.map((l) => (
          <motion.button
            key={l.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenLesson(l.id)}
            title={`${l.lessonCode} — ${l.concept}`}
            className={cn(
              "group relative flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-lg border text-center transition-colors",
              l.completed
                ? cn(accent.soft, accent.border)
                : "border-border/50 bg-card hover:bg-accent/40"
            )}
          >
            <span
              className={cn(
                "font-mono text-[10px] font-medium tabular-nums",
                l.completed ? accent.text : "text-muted-foreground/70"
              )}
            >
              {l.lessonCode}
            </span>
            {l.completed ? (
              <Check
                className="h-3 w-3"
                style={{ color: accent.hex }}
              />
            ) : (
              <Circle className="h-2 w-2 text-muted-foreground/30" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
