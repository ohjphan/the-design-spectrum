"use client";

import { useState, useRef, useLayoutEffect } from "react";
import type { ArchetypeId } from "@/lib/types";
import { getArchetypeById } from "@/lib/data";

const AXIS_ORDER: ArchetypeId[] = [
  "visionary",
  "systems-thinker",
  "growth-optimization",
  "craft-purist",
  "researcher",
  "design-operator",
  "strategic-partner",
];

const LABEL_SHORT: Record<ArchetypeId, string> = {
  visionary: "Visionary",
  "systems-thinker": "Systems Thinker",
  "growth-optimization": "Growth",
  "craft-purist": "Craft Purist",
  researcher: "Researcher",
  "design-operator": "Design Operator",
  "strategic-partner": "Strategic Partner",
};

interface ArchetypeRadarChartProps {
  distribution: Record<ArchetypeId, number>;
}

const SIZE = 440;
const CENTER = SIZE / 2;
const MAX_R = 100;
const LABEL_R = MAX_R + 32;
const LEVELS = 5;
const MAX_VALUE = 5;

// SVG: y increases downward. Angle 0 = right, 90° = bottom. For "top" we need y = CENTER - r, so angle 90° (sin=1).
function polarToCart(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER - r * Math.sin(rad),
  };
}

export function ArchetypeRadarChart({ distribution }: ArchetypeRadarChartProps) {
  const [selectedId, setSelectedId] = useState<ArchetypeId | null>(null);
  const n = AXIS_ORDER.length;
  const angleStep = 360 / n;
  // First axis (Visionary) at top, then clockwise: 90°, 90°-step, ...
  const angles = AXIS_ORDER.map((_, i) => 90 - i * angleStep);

  const gridPoints = Array.from({ length: LEVELS }, (_, level) => {
    const r = ((level + 1) / LEVELS) * MAX_R;
    return angles.map((angle) => polarToCart(angle, r));
  });

  const dataValues = AXIS_ORDER.map((id) => distribution[id] ?? 0);
  const normalized = dataValues.map((v) => Math.min(v, MAX_VALUE) / MAX_VALUE);
  const dataPoints = angles.map((angle, i) =>
    polarToCart(angle, normalized[i] * MAX_R)
  );
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z";

  const selectedArchetype = selectedId ? getArchetypeById(selectedId) : null;
  const selectedIndex = selectedId != null ? AXIS_ORDER.indexOf(selectedId) : -1;
  const selectedLabelPos =
    selectedIndex >= 0 ? polarToCart(angles[selectedIndex], LABEL_R) : null;

  const figureRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!selectedLabelPos || !figureRef.current || !svgRef.current) {
      setTooltipStyle(null);
      return;
    }
    const fig = figureRef.current.getBoundingClientRect();
    const svg = svgRef.current.getBoundingClientRect();
    const scaleX = svg.width / SIZE;
    const scaleY = svg.height / SIZE;
    const labelPxX = svg.left - fig.left + selectedLabelPos.x * scaleX;
    const labelPxY = svg.top - fig.top + selectedLabelPos.y * scaleY;
    setTooltipStyle({
      left: labelPxX,
      top: labelPxY + 12,
    });
  }, [selectedLabelPos?.x, selectedLabelPos?.y, selectedId]);

  return (
    <figure
      ref={figureRef}
      className="relative flex flex-col items-center overflow-visible"
      aria-label="Archetype distribution"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[340px] sm:max-w-[380px]"
        role="img"
        style={{ overflow: "visible" }}
      >
        {/* Concentric grid polygons */}
        <g stroke="var(--gray-light)" strokeWidth="0.5" fill="none">
          {gridPoints.map((pts, level) => (
            <polygon
              key={level}
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          ))}
        </g>

        {/* Axis spokes */}
        <g stroke="var(--gray-light)" strokeWidth="0.5">
          {angles.map((angle, i) => {
            const end = polarToCart(angle, MAX_R);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={end.x}
                y2={end.y}
              />
            );
          })}
        </g>

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="var(--accent)"
          fillOpacity="0.15"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Axis labels with tooltips */}
        <g
          className="fill-foreground"
          style={{ font: "500 11px var(--font-sans)" }}
        >
          {angles.map((angle, i) => {
            const id = AXIS_ORDER[i];
            const archetype = getArchetypeById(id);
            const pos = polarToCart(angle, LABEL_R);
            const label = LABEL_SHORT[id];
            const anchor =
              Math.abs(angle - 90) < 1
                ? "middle"
                : angle > -90 && angle < 90
                  ? "start"
                  : "end";
            return (
              <g
                key={id}
                onClick={() => setSelectedId(selectedId === id ? null : id)}
                className="cursor-pointer"
              >
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-foreground"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>

      </svg>
      {selectedArchetype?.shortDescription && tooltipStyle && (
        <div
          className="absolute z-10 w-full max-w-[320px] -translate-x-1/2 rounded border border-gray-mid bg-[#1a1a1a] px-4 py-3 text-sm text-white shadow-md"
          style={{ left: tooltipStyle.left, top: tooltipStyle.top }}
          role="dialog"
          aria-label="Archetype description"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{selectedArchetype.shortDescription}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(null);
              }}
              className="shrink-0 rounded p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
        </div>
      )}
    </figure>
  );
}
