import { Sparkles, ArrowRight } from "lucide-react";
import heroImage from "../assets/hero-xray.jpg";

export default function HeroSection({ onStart }) {
  return (
    <section className="medai-container hero" id="dashboard">
      <div>
        <span className="pill">
          <Sparkles size={14} /> AI-Powered Medical Imaging
        </span>
        <h1>Multimodal Disease Diagnosis Assistant</h1>
        <p>
          Analyze chest X-rays and patient symptoms using an AI-powered diagnostic
          research assistant.
        </p>
        <button className="btn btn-primary" onClick={onStart} type="button">
          Start Diagnosis <ArrowRight size={18} />
        </button>
      </div>

      <div className="hero-visual glass">
        <img src={heroImage} alt="Holographic chest X-ray analysed by an AI system" />
        <div className="scanline" aria-hidden="true" />
      </div>
    </section>
  );
}
