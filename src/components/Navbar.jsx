import { Activity } from "lucide-react";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="medai-container nav-inner">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <Activity size={20} />
          </div>
          <span>MedAI</span>
        </div>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#diagnosis">Diagnosis</a></li>
            <li><a href="#history">History</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        <div className="status-badge">
          <span className="dot" aria-hidden="true" />
          AI System Online
        </div>
      </div>
    </header>
  );
}
