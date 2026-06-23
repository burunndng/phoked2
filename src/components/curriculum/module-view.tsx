"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/use-app";
import {
  getAccent,
  VECTOR_META,
  STATUS_META,
  type LessonMeta,
} from "@/lib/accents";
import { ArrowLeft, Check, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

export function ModuleView() {
  const moduleId = useApp((s) => s.activeModuleId);
  const findModule = useApp((s) => s.findModule);
  const openLesson = useApp((s) => s.openLesson);
  const goDashboard = useApp((s) => s.goDashboard);
  const { t } = useT();

  const m = moduleId ? findModule(moduleId) : undefined;

  if (!m) return null;
  const accent = getAccent(m.accent);
  const done = m.lessons.filter((l) => l.completed).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={goDashboard}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {t("mod.allModules")}
      </button>

      {/* Module header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-7 sm:p-10",
          accent.border,
          accent.gradient
        )}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: accent.hex }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl font-display text-2xl font-medium",
                accent.softStrong,
                accent.text
              )}
            >
              {m.number}
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("mod.complete")} {m.number} · {done}/{m.lessons.length}
              </p>
              <h1 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                {m.title}
              </h1>
            </div>
          </div>

          <p className="prose-reader mt-5 max-w-2xl text-foreground/85">
            {m.theme}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {m.description}
          </p>
        </div>
      </motion.div>

      {/* Lesson list */}
      <div className="mt-8">
        <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          {m.lessons.length} {t("mod.lessons")}
        </p>
        <div className="space-y-1.5">
          {m.lessons.map((l, i) => (
            <LessonRow
              key={l.id}
              lesson={l}
              index={i}
              accentSoft={accent.soft}
              onOpen={() => openLesson(l.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonRow({
  lesson: l,
  index,
  accentSoft,
  onOpen,
}: {
  lesson: LessonMeta;
  index: number;
  accentSoft: string;
  onOpen: () => void;
}) {
  const vMeta = VECTOR_META[l.vector];
  const { t } = useT();
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={onOpen}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border border-border/50 bg-card px-4 py-3.5 text-left transition-all",
        "hover:border-border hover:bg-accent/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium tabular-nums",
          l.completed
            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
            : accentSoft + " text-muted-foreground"
        )}
      >
        {l.completed ? <Check className="h-4 w-4" /> : l.lessonCode}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium">{l.concept}</h3>
          {l.status !== "settled" && (
            <span
              title={t(STATUS_META[l.status].descKey)}
              className={cn(
                "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                STATUS_META[l.status].dot
              )}
            />
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {l.keyFigures}
        </p>
      </div>

      <span
        className="hidden shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium sm:inline-flex"
        style={{
          backgroundColor: `${vMeta.hex}1a`,
          color: vMeta.hex,
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: vMeta.hex }}
        />
        {t(vMeta.shortKey)}
      </span>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
    </motion.button>
  );
}
