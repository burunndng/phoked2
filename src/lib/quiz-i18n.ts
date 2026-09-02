// Language-aware access to lesson comprehension quizzes.
// Mirrors lesson-i18n.ts: English is the source of truth; Castellano
// mirrors it and falls back to English for any lesson not translated.

import { LESSON_QUIZ, type ComprehensionMCQ } from "./quiz-content";
import { LESSON_QUIZ_ES } from "./quiz-content-es";
import type { Lang } from "./i18n";

export type { ComprehensionMCQ };

export function getLessonQuiz(
  lessonCode: string,
  lang: Lang = "en"
): ComprehensionMCQ | undefined {
  if (lang === "es") {
    return LESSON_QUIZ_ES[lessonCode] ?? LESSON_QUIZ[lessonCode];
  }
  return LESSON_QUIZ[lessonCode];
}

export function hasLessonQuiz(lessonCode: string, lang: Lang = "en"): boolean {
  return !!getLessonQuiz(lessonCode, lang);
}
