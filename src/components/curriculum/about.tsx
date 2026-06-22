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

const VECTOR_ICONS: Record<Vector, React.ElementType> = {
  critical: Eye,
  materialist: Layers,
  phenomenological: Sparkles,
  ecological: Leaf,
};

export function About() {
  const goDashboard = useApp((s) => s.goDashboard);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={goDashboard}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Dashboard
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Compass className="h-3.5 w-3.5" />
          About this curriculum
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          A daily practice of seeing
        </h1>

        <div className="prose-reader mt-6 space-y-4 text-foreground/85">
          <p>
            This is not a course to be completed. It is an instrument to be
            kept. Seventy-six lessons, five to ten minutes each, composed on
            demand and held in memory — a daily practice of seeing how reality
            is built, by whom, and at whose expense.
          </p>
          <p>
            The sequence has a logic. It moves from{" "}
            <em>who</em> is knowing, through <em>how</em> we know and{" "}
            <em>what the mind does</em>, to how collectives construct reality,
            how power operates on that construction, how systems behave, the
            specific material form of the present, the information envelope we
            live inside — and finally to navigation. Each lesson cross-references
            at least one prior lesson. The cross-references are load-bearing:
            they are how the architecture holds.
          </p>
        </div>

        {/* Delivery spec */}
        <div className="mt-10 rounded-xl border border-border/60 bg-card p-6">
          <h2 className="font-display text-lg font-medium">
            The lesson structure
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every session, the same eight movements — never skipped.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Concept & Originator(s)", "What, and from whom."],
              ["Core Claim", "Two sentences. Maximum precision. No hedging."],
              ["Mechanism", "How it actually operates in reality."],
              ["Canonical Example", "Post-2020, specific, non-obvious."],
              ["Conceptual Tension", "The paradox or critique that keeps it alive."],
              ["Connection Node", "At least one explicit cross-link to a prior lesson."],
              ["Micro-Praxis", "A ninety-second exercise you can do immediately."],
              ["Zeigarnik Hook", "One unresolved question. No answer."],
            ].map(([k, v]) => (
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
            Four integrated vectors
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Running throughout, not bolted on.
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
                    <p className="text-sm font-medium">{meta.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {meta.description}
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
            What this version still cannot see
          </h2>
          <p className="prose-reader mt-3 italic text-foreground/80">
            Aesthetic and artistic knowledge is entirely absent. Queer theory
            beyond Butler is thin. Non-Western systems thought — African ubuntu
            cosmology, Andean sumak kawsay, Daoist process philosophy — appears
            at the margins. The body at scale — trauma studies, somatic
            politics, disability studies — is underrepresented relative to its
            explanatory power.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            These are not defects to be embarrassed by. They are the next
            iteration&apos;s brief.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
