"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  color?: string; // hex
  trackColor?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  size = 120,
  stroke = 8,
  color = "currentColor",
  trackColor,
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = circumference * (1 - clamped);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor ?? "currentColor"}
          strokeWidth={stroke}
          className="opacity-15"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      {label !== undefined && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display tabular-nums"
            style={{ fontSize: size * 0.22, lineHeight: 1 }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              className="text-muted-foreground mt-1"
              style={{ fontSize: size * 0.085 }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
