import { useCallback, useEffect, useRef, useState } from "react";
import { ScanLine, Stethoscope } from "lucide-react";
import axios from "axios";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ImageUpload from "./ImageUpload";
import PatientForm from "./PatientForm";
import AnalyzeButton from "./AnalyzeButton";
import LoadingState from "./LoadingState";
import ResultsDashboard from "./ResultsDashboard";
import Toasts from "./Toasts";
import Disclaimer from "./Disclaimer";
import { predictDisease } from "../services/api";

import "../styles/medai.css";

const EMPTY_PATIENT = {
  symptoms: "",
  age: "",
  gender: "",
  patientId: "",
  medicalHistory: "",
};

export default function MedAIApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [patient, setPatient] = useState(EMPTY_PATIENT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);

  const workspaceRef = useRef(null);
  const resultsRef = useRef(null);

  const pushToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSelect = (selected) => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError("");
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
  };

  const handleReset = () => {
    handleRemove();
    setPatient(EMPTY_PATIENT);
    setResult(null);
    setError("");
  };

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a chest X-ray image before analyzing.");
      pushToast("error", "No X-ray image selected.");
      return;
    }
    if (!patient.symptoms.trim()) {
      setError("Please describe the patient's symptoms before analyzing.");
      pushToast("error", "Symptoms are required.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);
    setTimeout(() => scrollTo(resultsRef), 80);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("symptoms", patient.symptoms);
    formData.append("age", patient.age);
    formData.append("medical_history", patient.medicalHistory);
    if (patient.gender) formData.append("gender", patient.gender);
    if (patient.patientId) formData.append("patient_id", patient.patientId);

    try {
      const data = await predictDisease(formData);

      if (!data || data.success === false) {
        throw new Error(data?.message || "The model could not complete the prediction.");
      }
      if (!data.prediction || typeof data.prediction !== "object") {
        throw new Error("Invalid response received from the server.");
      }

      setResult(data);
      pushToast("success", "Analysis complete.");
      setTimeout(() => scrollTo(resultsRef), 100);
    } catch (err) {
      let message = "Something went wrong while analyzing. Please try again.";
      if (axios.isAxiosError?.(err)) {
        if (err.code === "ECONNABORTED") {
          message = "The request timed out. The server took too long to respond.";
        } else if (!err.response) {
          message =
            "Cannot reach the backend at http://127.0.0.1:8000. Make sure the FastAPI server is running and CORS is enabled.";
        } else if (err.response.status === 422) {
          message = "The server rejected the submitted data. Please check your inputs.";
        } else {
          message = `Server error (${err.response.status}): ${
            err.response.data?.message || err.response.statusText
          }`;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      pushToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medai">
      <Navbar />
      <HeroSection onStart={() => scrollTo(workspaceRef)} />

      <section className="medai-container section" id="diagnosis" ref={workspaceRef}>
        <h2 className="section-title">
          <Stethoscope size={22} color="#2fd9ff" /> Diagnosis Workspace
        </h2>
        <p className="section-sub">
          Upload a chest X-ray and provide patient context to run a multimodal analysis.
        </p>

        <div className="grid-2">
          <ImageUpload
            file={file}
            preview={preview}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
          <PatientForm values={patient} onChange={setPatient} />
        </div>

        <AnalyzeButton loading={loading} onAnalyze={handleAnalyze} onReset={handleReset} />

        {error && (
          <div className="alert" role="alert">
            <span>{error}</span>
          </div>
        )}
      </section>

      <section className="medai-container section" id="history" ref={resultsRef}>
        <h2 className="section-title">
          <ScanLine size={22} color="#2fd9ff" /> Results
        </h2>
        <p className="section-sub">Model output for the current submission.</p>

        {loading && <LoadingState />}

        {!loading && !result && (
          <div className="glass empty">
            <div className="empty-icon">
              <ScanLine size={38} />
            </div>
            <h3>Your diagnosis results will appear here</h3>
            <p>Upload a chest X-ray and enter symptoms to begin.</p>
          </div>
        )}

        {!loading && result && (
          <ResultsDashboard
            result={result}
            patient={patient}
            preview={preview}
            onNewDiagnosis={() => {
              handleReset();
              scrollTo(workspaceRef);
            }}
          />
        )}
      </section>

      <section className="medai-container section" id="about">
        <Disclaimer message="MedAI is a student research prototype. Predictions are generated by an experimental multimodal model and must never be used for real clinical decisions." />
      </section>

      <footer className="footer">
        <div className="medai-container">
          MedAI — Multimodal Disease Diagnosis Assistant · Research demo
        </div>
      </footer>

      <Toasts toasts={toasts} />
    </div>
  );
}
