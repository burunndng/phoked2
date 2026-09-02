"use client";

import { useEffect } from "react";
import { useApp } from "@/store/use-app";

// Keeps <html lang="..."> in sync with the client-side language choice.
// The SSR default of "en" in layout.tsx is correct for the initial render;
// this component propagates the user's selection after hydration so screen
// readers, browser translation, and :lang() selectors see the right locale.
export function HtmlLangSync() {
  const lang = useApp((s) => s.lang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
