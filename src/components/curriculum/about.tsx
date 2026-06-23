"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/use-app";
import { VECTOR_META, type Vector } from "@/lib/accents";
import {
  ArrowLeft,
  Eye,
  Layers,
  Sparkles,
  Leaf,
  Compass,
} from "lucide-react";
import { useT } from "@/hooks/use-t";

const VECTOR_ICONS: Record<Vector, React.ElementType> = {
  critical: Eye,
  materialist: Layers,
  phenomenological: Sparkles,
  ecological: Leaf,
};

export function About() {
  const goDashboard = useApp((s) => s.goDashboard);
  const { t } = useT();

  const structureItems = [
    { k: t("about.structure.1.k"), v: t("about.structure.1.v") },
    { k: t("about.structure.2.k"), v: t("about.structure.2.v") },
    { k: t("about.structure.3.k"), v: t("about.structure.3.v") },
    { k: t("about.structure.4.k"), v: t("about.structure.4.v") },
    { k: t("about.structure.5.k"), v: t("about.structure.5.v") },
    { k: t("about.structure.6.k"), v: t("about.structure.6.v") },
    { k: t("about.structure.7.k"), v: t("about.structure.7.v") },
    { k: t("about.structure.8.k"), v: t("about.structure.8.v") },
    { k: t("about.structure.9.k"), v: t("about.structure.9.v") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={goDashboard}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {t("nav.dashboard")}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Compass className="h-3.5 w-3.5" />
          {t("about.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {t("about.title")}
        </h1>

        <div className="prose-reader mt-6 space-y-4 text-foreground/85">
          <p>{t("about.body1")}</p>
          <p>{t("about.body2")}</p>
        </div>

        {/* Delivery spec */}
        <div className="mt-10 rounded-xl border border-border/60 bg-card p-6">
          <h2 className="font-display text-lg font-medium">
            {t("about.structure.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("about.structure.desc")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {structureItems.map(({ k, v }) => (
              <li key={k} className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                <span>
                  <span className="font-medium">{k}</span>{" "}
                  <span className="text-muted-foreground">— {v}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vectors */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-medium">
            {t("about.vectors.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("about.vectors.desc")}
          </p>
          <div className="mt-4 space-y-3">
            {(Object.keys(VECTOR_META) as Vector[]).map((v) => {
              const meta = VECTOR_META[v];
              const Icon = VECTOR_ICONS[v];
              return (
                <div
                  key={v}
                  className="flex gap-3 rounded-lg border border-border/50 bg-card p-4"
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    style={{ color: meta.hex }}
                  />
                  <div>
                    <p className="text-sm font-medium">{t(meta.labelKey)}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {t(meta.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Honesty */}
        <div className="mt-10 rounded-xl border border-dashed border-border/70 bg-muted/20 p-6">
          <h2 className="font-display text-lg font-medium">
            {t("about.blind.title")}
          </h2>
          <p className="prose-reader mt-3 italic text-foreground/80">
            {t("about.blind.body")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("about.blind.footer")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
