"use client";

import * as React from "react";
import { useApp } from "@/store/use-app";
import { ThemeToggle } from "./theme-toggle";
import { Compass, BookOpen, LayoutGrid, Info, Languages, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";
import { LANGS } from "@/lib/i18n";

export function AppShell({ children }: { children: React.ReactNode }) {
  const view = useApp((s) => s.view);
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const goDashboard = useApp((s) => s.goDashboard);
  const goAtlas = useApp((s) => s.goAtlas);
  const goGraph = useApp((s) => s.goGraph);
  const goAbout = useApp((s) => s.goAbout);
  const completed = useApp((s) => s.syllabus?.completed ?? 0);
  const total = useApp((s) => s.syllabus?.totalLessons ?? 0);
  const { t } = useT();

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
                {t("site.name")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("site.subtitle")}
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
              <span className="hidden sm:inline">{t("nav.atlas")}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goGraph}
              className={cn(
                "gap-1.5 text-muted-foreground",
                view === "graph" && "text-foreground"
              )}
            >
              <Share2 className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">{t("nav.graph")}</span>
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
              <span className="hidden sm:inline">{t("nav.about")}</span>
            </Button>
            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <div className="hidden items-center gap-1.5 px-2 text-xs text-muted-foreground sm:flex">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="tabular-nums">
                {completed}/{total}
              </span>
            </div>

            {/* Language toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  aria-label="Change language"
                >
                  <Languages className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-xs font-medium uppercase">
                    {lang}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "flex items-center justify-between gap-3",
                      lang === l.code && "font-medium"
                    )}
                  >
                    {l.label}
                    {lang === l.code && (
                      <span className="text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-border/60 bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p className="max-w-xl leading-relaxed">{t("footer.text")}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {t("footer.edition")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
