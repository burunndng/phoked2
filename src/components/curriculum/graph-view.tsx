"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as d3force from "d3-force";
import { useApp } from "@/store/use-app";
import { getAccent, ACCENTS, type Accent } from "@/lib/accents";
import { useT } from "@/hooks/use-t";
import { ArrowLeft, Share2, Move, ZoomIn, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────

interface GraphNode {
  id: string;
  lessonCode: string;
  concept: string;
  moduleNumber: number;
  accent: string;
  vector: string;
  status: string;
  completed: boolean;
  hasContent: boolean;
}

interface GraphEdge {
  source: string;
  target: string;
  sourceCode: string;
  targetCode: string;
  type: "reference" | "sequence";
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  lang: string;
  stats: {
    totalNodes: number;
    referenceEdges: number;
    sequenceEdges: number;
  };
}

// Simulation node/edge (d3 mutates these with x, y, vx, vy)
interface SimNode extends GraphNode, d3force.SimulationNodeDatum {}
interface SimEdge extends d3force.SimulationLinkDatum<SimNode> {
  type: "reference" | "sequence";
  sourceCode: string;
  targetCode: string;
}

// ── Component ──────────────────────────────────────────────

export function GraphView() {
  const lang = useApp((s) => s.lang);
  const goDashboard = useApp((s) => s.goDashboard);
  const openLesson = useApp((s) => s.openLesson);
  const { t } = useT();

  const [data, setData] = React.useState<GraphData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 800, h: 600 });

  // SVG pan/zoom transform
  const [transform, setTransform] = React.useState({ x: 0, y: 0, k: 1 });
  const isPanning = React.useRef(false);
  const panStart = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Simulation nodes/edges (position state)
  const [simNodes, setSimNodes] = React.useState<SimNode[]>([]);
  const [simEdges, setSimEdges] = React.useState<SimEdge[]>([]);

  // ── Load graph data ──────────────────────────────────────
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/graph?lang=${lang}`)
      .then((r) => r.json())
      .then((d: GraphData) => {
        if (cancelled) return;
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // ── Measure container ────────────────────────────────────
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: Math.max(rect.height, 500) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Run force simulation (only when data loads) ─────────
  const sizeRef = React.useRef(size);
  sizeRef.current = size;

  React.useEffect(() => {
    if (!data) return;
    const { w, h } = sizeRef.current;
    if (w === 0) return;

    const nodes: SimNode[] = data.nodes.map((n) => ({ ...n }));
    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    const edges: SimEdge[] = data.edges
      .map((e) => ({
        source: nodeById.get(e.source)!,
        target: nodeById.get(e.target)!,
        type: e.type,
        sourceCode: e.sourceCode,
        targetCode: e.targetCode,
      }))
      .filter((e) => e.source && e.target);

    // Initialize positions in a circle by module for nicer start.
    const moduleCount = 8;
    nodes.forEach((n) => {
      const moduleAngle =
        ((n.moduleNumber - 1) / moduleCount) * Math.PI * 2 - Math.PI / 2;
      const moduleR = Math.min(w, h) * 0.3;
      const jitter = (Math.random() - 0.5) * 50;
      n.x = w / 2 + Math.cos(moduleAngle) * moduleR + jitter;
      n.y = h / 2 + Math.sin(moduleAngle) * moduleR + jitter;
    });

    // Set initial render immediately (before simulation ticks).
    setSimNodes([...nodes]);
    setSimEdges([...edges]);

    const sim = d3force
      .forceSimulation<SimNode>(nodes)
      .force(
        "link",
        d3force
          .forceLink<SimNode, SimEdge>(edges)
          .id((d) => d.id)
          .distance((d) => (d.type === "reference" ? 100 : 55))
          .strength((d) => (d.type === "reference" ? 0.35 : 0.12))
      )
      .force("charge", d3force.forceManyBody().strength(-200))
      .force("center", d3force.forceCenter(w / 2, h / 2))
      .force(
        "collide",
        d3force.forceCollide<SimNode>().radius((n) => nodeRadius(n) + 8)
      )
      .alpha(1)
      .alphaDecay(0.025)
      .velocityDecay(0.35);

    // Module clustering via a positional force.
    sim.force(
      "x",
      d3force
        .forceX<SimNode>((d) => {
          const angle =
            ((d.moduleNumber - 1) / 8) * Math.PI * 2 - Math.PI / 2;
          return w / 2 + Math.cos(angle) * Math.min(w, h) * 0.28;
        })
        .strength(0.04)
    );
    sim.force(
      "y",
      d3force
        .forceY<SimNode>((d) => {
          const angle =
            ((d.moduleNumber - 1) / 8) * Math.PI * 2 - Math.PI / 2;
          return h / 2 + Math.sin(angle) * Math.min(w, h) * 0.28;
        })
        .strength(0.04)
    );

    let tickCount = 0;
    sim.on("tick", () => {
      tickCount++;
      // Throttle React updates: every 2 ticks for smoothness.
      if (tickCount % 2 === 0) {
        setSimNodes([...nodes]);
        setSimEdges([...edges]);
      }
    });

    // Final render when simulation cools down.
    sim.on("end", () => {
      setSimNodes([...nodes]);
      setSimEdges([...edges]);
    });

    return () => {
      sim.stop();
    };
  }, [data]);

  // ── Pan & zoom handlers ──────────────────────────────────
  const onWheel = React.useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((prev) => {
      const k = Math.max(0.3, Math.min(3, prev.k * delta));
      // zoom toward cursor
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const nx = mx - (mx - prev.x) * (k / prev.k);
      const ny = my - (my - prev.y) * (k / prev.k);
      return { x: nx, y: ny, k };
    });
  }, []);

  const onPointerDown = React.useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPanning.current = true;
    panStart.current = {
      x: e.clientX,
      y: e.clientY,
      tx: transform.x,
      ty: transform.y,
    };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, [transform.x, transform.y]);

  const onPointerMove = React.useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setTransform((prev) => ({
      ...prev,
      x: panStart.current.tx + dx,
      y: panStart.current.ty + dy,
    }));
  }, []);

  const onPointerUp = React.useCallback((e: React.PointerEvent) => {
    isPanning.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  }, []);

  // ── Compute highlighted set ──────────────────────────────
  const highlighted = React.useMemo(() => {
    if (!hovered) return null;
    const connected = new Set<string>([hovered]);
    for (const e of simEdges) {
      const s = typeof e.source === "string" ? e.source : e.source?.id;
      const t = typeof e.target === "string" ? e.target : e.target?.id;
      if (s === hovered && t) connected.add(t);
      if (t === hovered && s) connected.add(s);
    }
    return connected;
  }, [hovered, simEdges]);

  if (loading) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32">
        <Share2 className="mb-4 h-8 w-8 animate-pulse text-muted-foreground" />
        <p className="font-display text-lg text-muted-foreground">
          {t("graph.loading")}
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={goDashboard}
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {t("nav.dashboard")}
      </button>

      <div className="mb-6 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-6 bg-muted-foreground/40" />
          {t("graph.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {t("graph.title")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("graph.desc")}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="tabular-nums">
          {data.stats.totalNodes} {t("graph.stats.nodes")}
        </span>
        <span className="tabular-nums">
          {data.stats.referenceEdges} {t("graph.stats.refs")}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground/70">
          <Move className="h-3 w-3" />
          {t("graph.hint")}
        </span>
      </div>

      {/* Graph canvas */}
      <div
        ref={containerRef}
        className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-2xl border border-border/60 bg-card/40"
        style={{ touchAction: "none" }}
      >
        <svg
          width={size.w}
          height={size.h}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <defs>
            {/* glow filter for reference edges */}
            <filter id="glow-ref" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* glow filter for nodes */}
            <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
            {/* Edges */}
            {simEdges.map((e, i) => {
              const s = e.source as SimNode;
              const tg = e.target as SimNode;
              if (s.x == null || s.y == null || tg.x == null || tg.y == null)
                return null;
              const isActive =
                !hovered ||
                (highlighted &&
                  ((s.id === hovered && highlighted.has(tg.id)) ||
                    (tg.id === hovered && highlighted.has(s.id))));
              const isRef = e.type === "reference";
              return (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y}
                  x2={tg.x}
                  y2={tg.y}
                  stroke={
                    isRef
                      ? "oklch(0.7 0.13 70)"
                      : "oklch(0.5 0 0)"
                  }
                  strokeWidth={isRef ? 1.2 : 0.6}
                  strokeOpacity={
                    isActive
                      ? isRef
                        ? 0.5
                        : 0.2
                      : 0.04
                  }
                  filter={isRef && isActive ? "url(#glow-ref)" : undefined}
                />
              );
            })}

            {/* Nodes */}
            {simNodes.map((n) => {
              if (n.x == null || n.y == null) return null;
              const r = nodeRadius(n);
              const accent = getAccent(n.accent);
              const isHovered = hovered === n.id;
              const isConnected = highlighted?.has(n.id);
              const isDimmed = hovered && !isConnected;
              const statusHex =
                n.status === "actively-debated"
                  ? "#ef4444"
                  : n.status === "contested"
                  ? "#f59e0b"
                  : null;

              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  style={{
                    cursor: "pointer",
                    opacity: isDimmed ? 0.2 : 1,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    openLesson(n.id);
                  }}
                >
                  {/* glow ring for hovered/connected */}
                  {(isHovered || (isConnected && hovered)) && (
                    <circle
                      r={r + 6}
                      fill="none"
                      stroke={accent.hex}
                      strokeOpacity={0.3}
                      strokeWidth={2}
                      filter="url(#glow-node)"
                    />
                  )}
                  {/* main node circle */}
                  <circle
                    r={r}
                    fill={n.completed ? accent.hex : `${accent.hex}30`}
                    stroke={accent.hex}
                    strokeWidth={n.completed ? 0 : 1.5}
                    style={{
                      transition: "r 0.2s, fill 0.2s",
                    }}
                  />
                  {/* status ring for contested/actively-debated */}
                  {statusHex && !n.completed && (
                    <circle
                      r={r + 3}
                      fill="none"
                      stroke={statusHex}
                      strokeWidth={1}
                      strokeOpacity={0.6}
                      strokeDasharray="2 2"
                    />
                  )}
                  {/* lesson code label */}
                  <text
                    textAnchor="middle"
                    dy="0.32em"
                    fontSize={r > 12 ? 9 : 0}
                    fill={n.completed ? "#fff" : accent.hex}
                    className="font-mono pointer-events-none select-none"
                    fontWeight={500}
                  >
                    {n.lessonCode}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hovered node tooltip */}
        {hovered &&
          simNodes.find((n) => n.id === hovered) &&
          (() => {
            const n = simNodes.find((n) => n.id === hovered)!;
            const accent = getAccent(n.accent);
            return (
              <div
                className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur"
                style={{ borderColor: `${accent.hex}40` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: accent.hex }}
                  >
                    {n.lessonCode}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · M{n.moduleNumber}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium leading-tight">
                  {n.concept}
                </p>
              </div>
            );
          })()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-6 rounded-full bg-amber-500/60" />
          {t("graph.legend.reference")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-6 rounded-full bg-muted-foreground/30" />
          {t("graph.legend.sequence")}
        </span>
        <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
        {/* Module colors */}
        {(Object.keys(ACCENTS) as Accent[]).map((a) => {
          const ac = ACCENTS[a];
          return (
            <span key={a} className="flex items-center gap-1">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ac.hex }}
              />
            </span>
          );
        })}
        <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-amber-500" />
          {t("graph.legend.contested")}
        </span>
      </div>
    </div>
  );
}

// Node radius based on connection count (computed lazily from edges).
// For simplicity, use a fixed radius with a slight boost for generated lessons.
function nodeRadius(n: GraphNode): number {
  return n.hasContent ? 14 : 11;
}
