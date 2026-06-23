"use client";

import { useApp } from "@/store/use-app";
import { translate, type Lang } from "@/lib/i18n";

// Returns [lang, t] where t(key) resolves a translation key in the current
// language. Components use this to get localized strings.
export function useT(): {
  lang: Lang;
  t: (key: string) => string;
} {
  const lang = useApp((s) => s.lang);
  return { lang, t: (key: string) => translate(lang, key) };
}
