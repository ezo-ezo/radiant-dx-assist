import { useEffect, useState } from "react";

export function levelFor(value) {
  if (value > 60) return { label: "Higher probability", color: "#ff5f6d" };
  if (value >= 30) return { label: "Moderate probability", color: "#ffa23a" };
  return { label: "Low probability", color: "#22d39a" };
}

export default function PredictionCard({ name, value, delay = 0 }) {
  const level = levelFor(value);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(100, Math.max(0, value))), 80 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="glass pcard fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="pcard-top">
        <h4>{name}</h4>
        <span className="val" style={{ color: level.color }}>{value.toFixed(2)}%</span>
      </div>
      <div
        className="track"
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} probability`}
      >
        <div className="fill" style={{ width: `${width}%`, background: level.color }} />
      </div>
      <span className="tag" style={{ color: level.color }}>{level.label}</span>
    </div>
  );
}
