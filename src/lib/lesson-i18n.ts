// Language-aware access to lesson content.
// English is the source of truth; Castellano mirrors it and falls back
// to English for any lesson not yet translated.

import { LESSON_CONTENT, type LessonContent } from "./lesson-content";
import { LESSON_CONTENT_ES } from "./lesson-content-es";
import type { Lang } from "./i18n";

export type { LessonContent };

export function getLessonContent(
  lessonCode: string,
  lang: Lang = "en"
): LessonContent | undefined {
  if (lang === "es") {
    return LESSON_CONTENT_ES[lessonCode] ?? LESSON_CONTENT[lessonCode];
  }
  return LESSON_CONTENT[lessonCode];
}

export function hasLessonContent(
  lessonCode: string,
  lang: Lang = "en"
): boolean {
  return !!getLessonContent(lessonCode, lang);
}

export function translatedLessonCount(lang: Lang): number {
  const map = lang === "es" ? LESSON_CONTENT_ES : LESSON_CONTENT;
  return Object.keys(map).length;
}
