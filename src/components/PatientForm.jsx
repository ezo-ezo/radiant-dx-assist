import { ClipboardList } from "lucide-react";

export default function PatientForm({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <div className="glass card">
      <div className="card-head">
        <span className="icon"><ClipboardList size={20} /></span>
        <h3>Patient Information</h3>
      </div>

      <div className="field">
        <label htmlFor="symptoms">Symptoms <span className="hint">(required)</span></label>
        <textarea
          id="symptoms"
          className="textarea"
          placeholder="e.g. persistent dry cough, shortness of breath for 5 days, chest pain when breathing"
          value={values.symptoms}
          onChange={set("symptoms")}
        />
      </div>

      <div className="row-2">
        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            min="0"
            max="120"
            className="input"
            placeholder="e.g. 54"
            value={values.age}
            onChange={set("age")}
          />
        </div>
        <div className="field">
          <label htmlFor="gender">Gender <span className="hint">(optional)</span></label>
          <select id="gender" className="select" value={values.gender} onChange={set("gender")}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="patientId">Patient ID <span className="hint">(optional)</span></label>
        <input
          id="patientId"
          className="input"
          placeholder="e.g. PT-10293"
          value={values.patientId}
          onChange={set("patientId")}
        />
      </div>

      <div className="field">
        <label htmlFor="medicalHistory">Medical history</label>
        <textarea
          id="medicalHistory"
          className="textarea"
          placeholder="e.g. hypertension, type 2 diabetes, former smoker, prior pneumonia in 2021"
          value={values.medicalHistory}
          onChange={set("medicalHistory")}
        />
      </div>
    </div>
  );
}
