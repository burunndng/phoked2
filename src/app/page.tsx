"use client";

import * as React from "react";
import { useApp } from "@/store/use-app";
import { AppShell } from "@/components/curriculum/app-shell";
import { Dashboard } from "@/components/curriculum/dashboard";
import { ModuleView } from "@/components/curriculum/module-view";
import { LessonReader } from "@/components/curriculum/lesson-reader";
import { Atlas } from "@/components/curriculum/atlas";
import { GraphView } from "@/components/curriculum/graph-view";
import { About } from "@/components/curriculum/about";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/hooks/use-t";

export default function Home() {
  const view = useApp((s) => s.view);
  const syllabus = useApp((s) => s.syllabus);
  const syllabusLang = useApp((s) => s.syllabusLang);
  const lang = useApp((s) => s.lang);
  const syllabusLoading = useApp((s) => s.syllabusLoading);
  const syllabusError = useApp((s) => s.syllabusError);
  const loadSyllabus = useApp((s) => s.loadSyllabus);
  const initLang = useApp((s) => s.initLang);

  // Initialize language from localStorage on mount, then load syllabus.
  React.useEffect(() => {
    initLang();
  }, [initLang]);

  React.useEffect(() => {
    // Load if: no syllabus yet, OR the syllabus was loaded in a different lang.
    if (
      (!syllabus && !syllabusLoading && !syllabusError) ||
      (syllabus && syllabusLang !== lang && !syllabusLoading)
    ) {
      loadSyllabus();
    }
  }, [syllabus, syllabusLoading, syllabusError, loadSyllabus, syllabusLang, lang]);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {!syllabus && syllabusLoading ? (
            <BootState />
          ) : syllabusError ? (
            <ErrorBoot message={syllabusError} onRetry={loadSyllabus} />
          ) : syllabus ? (
            <>
              {view === "dashboard" && <Dashboard />}
              {view === "module" && <ModuleView />}
              {view === "lesson" && <LessonReader />}
              {view === "atlas" && <Atlas />}
              {view === "graph" && <GraphView />}
              {view === "about" && <About />}
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

function BootState() {
  const { t } = useT();
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32">
      <div className="relative mb-6 h-10 w-10">
        <div className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
        <div className="relative h-10 w-10 animate-pulse rounded-full bg-amber-500/20" />
      </div>
      <p className="font-display text-lg text-muted-foreground">
        {t("boot.loading")}
      </p>
    </div>
  );
}

function ErrorBoot({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const { t } = useT();
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-32 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        {t("boot.retry")}
      </button>
    </div>
  );
}
