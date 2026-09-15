import { FileText, Sparkles, RefreshCw } from "lucide-react";
import PredictionCard, { levelFor } from "./PredictionCard";
import ProbabilityChart from "./ProbabilityChart";
import Disclaimer from "./Disclaimer";

export default function ResultsDashboard({ result, patient, preview, onNewDiagnosis }) {
  const entries = Object.entries(result.prediction || {}).map(([name, value]) => ({
    name,
    value: Number(value) || 0,
  }));

  const top =
    entries.find((e) => e.name === result.top_prediction) ||
    entries.slice().sort((a, b) => b.value - a.value)[0];

  const topLevel = top ? levelFor(top.value) : null;

  return (
    <div className="stack">
      {top && (
        <div className="glass top-card fade-up">
          <div>
            <p className="eyebrow">Top Prediction</p>
            <h2>{top.name}</h2>
            <span className="tag" style={{ color: topLevel.color }}>{topLevel.label}</span>
            <p style={{ color: "#9aaccb", fontSize: 13.5, marginTop: 14, marginBottom: 0 }}>
              Research prototype output — not a clinical diagnosis.
            </p>
          </div>
          <div
            className="gauge"
            style={{
              background: `conic-gradient(${topLevel.color} ${Math.min(100, top.value) * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
          >
            <span style={{ color: topLevel.color }}>{top.value.toFixed(1)}%</span>
          </div>
        </div>
      )}

      <div className="cards-grid">
        {entries.map((e, i) => (
          <PredictionCard key={e.name} name={e.name} value={e.value} delay={i * 70} />
        ))}
      </div>

      <ProbabilityChart data={entries} />

      <div className="glass card">
        <div className="card-head">
          <span className="icon"><FileText size={20} /></span>
          <h3>Input Summary</h3>
        </div>
        <div className="summary-grid">
          {preview ? (
            <img src={preview} alt="Analysed chest X-ray" />
          ) : (
            <div />
          )}
          <div>
            <div className="kv">
              <div className="k">Symptoms</div>
              <div className="v">{patient.symptoms || "—"}</div>
            </div>
            <div className="kv">
              <div className="k">Age</div>
              <div className="v">{patient.age || "—"}</div>
            </div>
            {patient.gender && (
              <div className="kv">
                <div className="k">Gender</div>
                <div className="v">{patient.gender}</div>
              </div>
            )}
            {patient.patientId && (
              <div className="kv">
                <div className="k">Patient ID</div>
                <div className="v">{patient.patientId}</div>
              </div>
            )}
            <div className="kv">
              <div className="k">Medical history</div>
              <div className="v">{patient.medicalHistory || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      <Disclaimer message={result.message} />

      <button type="button" className="btn btn-primary btn-lg" onClick={onNewDiagnosis}>
        <RefreshCw size={17} /> New Diagnosis <Sparkles size={16} />
      </button>
    </div>
  );
}
