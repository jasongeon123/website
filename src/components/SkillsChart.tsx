"use client";

import { useEffect, useRef, useState } from "react";
import { skillLevels } from "@/data/content";

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 110;
const LEVELS = [0.33, 0.66, 1];

function polarToXY(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getPolygonPoints(values: number[]) {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const { x, y } = polarToXY(i * step, (v / 100) * RADIUS);
      return `${x},${y}`;
    })
    .join(" ");
}

function getGridPolygon(scale: number) {
  const n = skillLevels.length;
  const step = 360 / n;
  return Array.from({ length: n }, (_, i) => {
    const { x, y } = polarToXY(i * step, RADIUS * scale);
    return `${x},${y}`;
  }).join(" ");
}

export default function SkillsChart() {
  const ref = useRef<SVGSVGElement>(null);
  const [animated, setAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const step = 360 / skillLevels.length;
  const currentValues = animated
    ? skillLevels.map((s) => s.level)
    : skillLevels.map(() => 0);

  return (
    <div className="skills-chart">
      <svg ref={ref} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Grid lines */}
        {LEVELS.map((level) => (
          <polygon
            key={level}
            points={getGridPolygon(level)}
            className="skills-chart-grid"
          />
        ))}

        {/* Axis lines */}
        {skillLevels.map((_, i) => {
          const { x, y } = polarToXY(i * step, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              className="skills-chart-axis"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={getPolygonPoints(currentValues)}
          className="skills-chart-polygon"
        />

        {/* Vertex dots and labels */}
        {skillLevels.map((skill, i) => {
          const { x, y } = polarToXY(i * step, (currentValues[i] / 100) * RADIUS);
          const label = polarToXY(i * step, RADIUS + 20);

          // Adjust text-anchor based on position
          let anchor: "middle" | "start" | "end" = "middle";
          if (label.x < CENTER - 10) anchor = "end";
          else if (label.x > CENTER + 10) anchor = "start";

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={hoveredIndex === i ? 6 : 4}
                className="skills-chart-dot"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="skills-chart-label"
              >
                {skill.name}
              </text>
              {hoveredIndex === i && (
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  className="skills-chart-tooltip"
                >
                  {skill.level}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
