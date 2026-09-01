// Language-aware access to syllabus metadata.
// English (src/lib/syllabus.ts) is the source of truth; the Castellano
// overlay in syllabus-es.ts supplies translated module and lesson strings,
// falling back to English wherever a translation is missing.

import { SYLLABUS, type SeedModule, type SeedLesson } from "./syllabus";
import { ES_MODULES, ES_LESSONS } from "./syllabus-es";
import type { Lang } from "./i18n";

export type { SeedModule, SeedLesson };

export function getSyllabus(lang: Lang = "en"): SeedModule[] {
  if (lang !== "es") return SYLLABUS;

  return SYLLABUS.map((m) => {
    const esM = ES_MODULES[m.number];
    return {
      ...m,
      title: esM?.title ?? m.title,
      theme: esM?.theme ?? m.theme,
      description: esM?.description ?? m.description,
      titleEs: esM?.title,
      themeEs: esM?.theme,
      descriptionEs: esM?.description,
      lessons: m.lessons.map((l) => {
        const esL = ES_LESSONS[l.lessonCode];
        return {
          ...l,
          concept: esL?.concept ?? l.concept,
          coreClaim: esL?.coreClaim ?? l.coreClaim,
          criticalNote: esL?.criticalNote ?? l.criticalNote,
          conceptEs: esL?.concept,
          coreClaimEs: esL?.coreClaim,
          criticalNoteEs: esL?.criticalNote,
        } as SeedLesson;
      }),
    };
  });
}

export function getLocalizedLesson(
  lessonCode: string,
  lang: Lang = "en"
): (SeedLesson & { moduleNumber: number }) | undefined {
  for (const m of getSyllabus(lang)) {
    const l = m.lessons.find((x) => x.lessonCode === lessonCode);
    if (l) return { ...l, moduleNumber: m.number };
  }
  return undefined;
}
