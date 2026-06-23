// Client-side progress + reflection persistence via localStorage.
// Replaces the previous server-side DB storage so the app works on any
// static/serverless host (Vercel, Netlify, etc.) with zero database.

const COMPLETED_KEY = "ra:completed"; // JSON: string[] of lessonIds
const REFLECTION_PREFIX = "ra:reflect:"; // per-lesson reflection text

export function getCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
}

export function setCompleted(lessonId: string, completed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    const set = getCompleted();
    if (completed) set.add(lessonId);
    else set.delete(lessonId);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore quota errors */
  }
}

export function getReflection(lessonId: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(REFLECTION_PREFIX + lessonId) ?? "";
  } catch {
    return "";
  }
}

export function setReflection(lessonId: string, text: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REFLECTION_PREFIX + lessonId, text);
  } catch {
    /* ignore quota errors */
  }
}
