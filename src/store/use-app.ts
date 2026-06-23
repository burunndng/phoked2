"use client";

import { create } from "zustand";
import type { SyllabusData, ModuleMeta, LessonMeta } from "@/lib/accents";
import type { Lang } from "@/lib/i18n";

export type View = "dashboard" | "module" | "lesson" | "atlas" | "graph" | "about";

const LANG_KEY = "ra:lang";

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

interface AppState {
  view: View;
  activeModuleId: string | null;
  activeLessonId: string | null;
  syllabus: SyllabusData | null;
  syllabusLang: Lang | null; // which lang the loaded syllabus is in
  syllabusLoading: boolean;
  syllabusError: string | null;
  lang: Lang;

  // navigation
  goDashboard: () => void;
  goAtlas: () => void;
  goGraph: () => void;
  goAbout: () => void;
  openModule: (moduleId: string) => void;
  openLesson: (lessonId: string) => void;

  // language
  setLang: (lang: Lang) => void;
  initLang: () => void;

  // data
  loadSyllabus: () => Promise<void>;

  // progress
  toggleComplete: (lessonId: string, completed: boolean) => Promise<void>;

  // helpers
  findModule: (moduleId: string) => ModuleMeta | undefined;
  findLesson: (
    lessonId: string
  ) => { lesson: LessonMeta; module: ModuleMeta } | undefined;
  nextLesson: (lessonId: string) => LessonMeta | null;
  prevLesson: (lessonId: string) => LessonMeta | null;
  firstIncomplete: () => LessonMeta | null;
}

export const useApp = create<AppState>((set, get) => ({
  view: "dashboard",
  activeModuleId: null,
  activeLessonId: null,
  syllabus: null,
  syllabusLang: null,
  syllabusLoading: false,
  syllabusError: null,
  lang: "en",

  goDashboard: () => set({ view: "dashboard" }),
  goAtlas: () => set({ view: "atlas" }),
  goGraph: () => set({ view: "graph" }),
  goAbout: () => set({ view: "about" }),

  openModule: (moduleId) => set({ view: "module", activeModuleId: moduleId }),

  openLesson: (lessonId) => set({ view: "lesson", activeLessonId: lessonId }),

  setLang: (lang) => {
    set({ lang });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {
        /* ignore */
      }
    }
    // force syllabus reload in the new language
    get().loadSyllabus();
  },

  initLang: () => {
    const stored = readStoredLang();
    if (stored !== get().lang) {
      set({ lang: stored });
    }
  },

  loadSyllabus: async () => {
    const lang = get().lang;
    set({ syllabusLoading: true, syllabusError: null });
    try {
      const res = await fetch(`/api/syllabus?lang=${lang}`);
      if (!res.ok) throw new Error("Failed to load syllabus");
      const data: SyllabusData = await res.json();
      set({ syllabus: data, syllabusLang: lang, syllabusLoading: false });
    } catch (e) {
      set({
        syllabusLoading: false,
        syllabusError: e instanceof Error ? e.message : "Unknown error",
      });
    }
  },

  toggleComplete: async (lessonId, completed) => {
    // optimistic
    const prev = get().syllabus;
    if (prev) {
      const modules = prev.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed } : l
        ),
      }));
      const completedCount = modules.reduce(
        (n, m) => n + m.lessons.filter((l) => l.completed).length,
        0
      );
      set({ syllabus: { ...prev, modules, completed: completedCount } });
    }
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed }),
      });
    } catch {
      // revert on failure
      if (prev) set({ syllabus: prev });
    }
  },

  findModule: (moduleId) =>
    get().syllabus?.modules.find((m) => m.id === moduleId),

  findLesson: (lessonId) => {
    const s = get().syllabus;
    if (!s) return undefined;
    for (const m of s.modules) {
      const lesson = m.lessons.find((l) => l.id === lessonId);
      if (lesson) return { lesson, module: m };
    }
    return undefined;
  },

  nextLesson: (lessonId) => {
    const s = get().syllabus;
    if (!s) return null;
    const flat = s.modules.flatMap((m) => m.lessons);
    const idx = flat.findIndex((l) => l.id === lessonId);
    if (idx === -1 || idx >= flat.length - 1) return null;
    return flat[idx + 1];
  },

  prevLesson: (lessonId) => {
    const s = get().syllabus;
    if (!s) return null;
    const flat = s.modules.flatMap((m) => m.lessons);
    const idx = flat.findIndex((l) => l.id === lessonId);
    if (idx <= 0) return null;
    return flat[idx - 1];
  },

  firstIncomplete: () => {
    const s = get().syllabus;
    if (!s) return null;
    const flat = s.modules.flatMap((m) => m.lessons);
    return flat.find((l) => !l.completed) ?? flat[0] ?? null;
  },
}));
