import { ScanSearch, RotateCcw, Loader2 } from "lucide-react";

export default function AnalyzeButton({ loading, onAnalyze, onReset }) {
  return (
    <div className="actions">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
            Analyzing...
          </>
        ) : (
          <>
            <ScanSearch size={18} /> Analyze X-ray
          </>
        )}
      </button>
      <button type="button" className="btn btn-ghost btn-lg" onClick={onReset} disabled={loading}>
        <RotateCcw size={17} /> Reset
      </button>
    </div>
  );
}
