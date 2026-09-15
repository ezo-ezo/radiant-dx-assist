import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { levelFor } from "./PredictionCard";

export default function ProbabilityChart({ data }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, [data]);

  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="glass card">
      <div className="card-head">
        <span className="icon"><BarChart3 size={20} /></span>
        <h3>Probability Overview</h3>
      </div>
      {sorted.map((item) => {
        const color = levelFor(item.value).color;
        return (
          <div className="chart-row" key={item.name}>
            <div className="name">{item.name}</div>
            <div className="track">
              <div
                className="fill"
                style={{ width: ready ? `${Math.min(100, item.value)}%` : 0, background: color }}
              />
            </div>
            <div className="num" style={{ color }}>{item.value.toFixed(1)}%</div>
          </div>
        );
      })}
    </div>
  );
}
