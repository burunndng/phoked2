"use client";

import * as React from "react";
import { useApp } from "@/store/use-app";
import { ThemeToggle } from "./theme-toggle";
import { Compass, BookOpen, LayoutGrid, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const view = useApp((s) => s.view);
  const goDashboard = useApp((s) => s.goDashboard);
  const goAtlas = useApp((s) => s.goAtlas);
  const goAbout = useApp((s) => s.goAbout);
  const completed = useApp((s) => s.syllabus?.completed ?? 0);
  const total = useApp((s) => s.syllabus?.totalLessons ?? 0);

  return (
    <div className="flex min-h-screen flex-col bg-background bg-grain">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            onClick={goDashboard}
            className="group flex items-center gap-2.5 text-left"
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/30 via-rose-500/20 to-emerald-500/30 blur-[2px] transition-opacity group-hover:opacity-80" />
              <Compass className="relative h-5 w-5 text-foreground" strokeWidth={1.5} />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[15px] font-medium tracking-tight">
                Reality&apos;s Architecture
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                A micro-learning curriculum
              </span>
            </span>
          </button>

          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={goAtlas}
              className={cn(
                "gap-1.5 text-muted-foreground",
                view === "atlas" && "text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Atlas</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goAbout}
              className={cn(
                "gap-1.5 text-muted-foreground",
                view === "about" && "text-foreground"
              )}
            >
              <Info className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">About</span>
            </Button>
            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <div className="hidden items-center gap-1.5 px-2 text-xs text-muted-foreground sm:flex">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="tabular-nums">
                {completed}/{total}
              </span>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-border/60 bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p className="max-w-xl leading-relaxed">
              Seventy-six lessons. Four integrated vectors. No single framework
              privileged. Composed on demand — each session generated for you,
              then held in memory.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Definitive Edition v3.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
