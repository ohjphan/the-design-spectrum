"use client";

const SIZE = 280;
const CENTER = SIZE / 2;
const MAX_R = 90;
const SEGMENTS = 7;
const LEVELS = 5;

function polarToCart(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER - r * Math.sin(rad),
  };
}

export function ResultsLoading() {
  const angleStep = 360 / SEGMENTS;
  const angles = Array.from({ length: SEGMENTS }, (_, i) => 90 - i * angleStep);

  const gridPoints = Array.from({ length: LEVELS }, (_, level) => {
    const r = ((level + 1) / LEVELS) * MAX_R;
    return angles.map((angle) => polarToCart(angle, r));
  });

  // Strong radius variation but scaled so red shape sits inside the gray grid (max radius = MAX_R)
  const radiusScales = [1.12, 0.78, 1.05, 0.88, 1.18, 0.82, 0.95];
  const maxScale = Math.max(...radiusScales);
  const radiusByVertex = radiusScales.map((s) => MAX_R * (s / maxScale));
  // Wide opacity range so segments feel clearly different
  const opacityBySegment = [0.15, 0.42, 0.22, 0.38, 0.12, 0.35, 0.28];

  const segmentPaths = angles.map((angle, i) => {
    const nextAngle = angles[(i + 1) % SEGMENTS];
    const r1 = radiusByVertex[i];
    const r2 = radiusByVertex[(i + 1) % SEGMENTS];
    const p1 = polarToCart(angle, r1);
    const p2 = polarToCart(nextAngle, r2);
    return `M ${CENTER} ${CENTER} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`;
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-48 w-48 sm:h-56 sm:w-56"
        role="img"
        aria-hidden
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
        {/* Animated segments */}
        <g>
          {segmentPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              className="animate-segment-in"
              style={{
                fill: "var(--accent)",
                fillOpacity: opacityBySegment[i],
                stroke: "var(--accent)",
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </g>
      </svg>
      <p className="text-xl text-gray-mid">Analyzing your design instincts…</p>
    </div>
  );
}
