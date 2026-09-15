import { AlertTriangle } from "lucide-react";

export default function Disclaimer({ message }) {
  return (
    <div className="disclaimer">
      <AlertTriangle size={17} />
      <span>
        {message ||
          "This result is for research/demo purposes and is not a medical diagnosis."}
      </span>
    </div>
  );
}
