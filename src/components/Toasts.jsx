import { CheckCircle2, XCircle } from "lucide-react";

export default function Toasts({ toasts }) {
  return (
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role="status">
          {t.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
