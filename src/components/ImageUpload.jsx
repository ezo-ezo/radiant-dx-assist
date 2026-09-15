import { useRef, useState } from "react";
import { UploadCloud, Trash2, ImageIcon, AlertCircle } from "lucide-react";

const ALLOWED = ["image/png", "image/jpeg", "image/jpg"];
const MAX_MB = 10;

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageUpload({ file, preview, onSelect, onRemove }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selected) => {
    if (!selected) return;
    if (!ALLOWED.includes(selected.type)) {
      setError("Unsupported file type. Please upload a PNG, JPG or JPEG image.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setError(`Image is too large. Maximum allowed size is ${MAX_MB} MB.`);
      return;
    }
    setError("");
    onSelect(selected);
  };

  return (
    <div className="glass card">
      <div className="card-head">
        <span className="icon"><ImageIcon size={20} /></span>
        <h3>Chest X-ray Upload</h3>
      </div>

      {!preview ? (
        <div
          className={`dropzone${drag ? " drag" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Upload chest X-ray image"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
        >
          <UploadCloud size={44} className="upload-icon" />
          <h4>Drag &amp; drop your X-ray here</h4>
          <p>Supported formats: PNG, JPG, JPEG (max {MAX_MB} MB)</p>
          <span className="btn btn-ghost">Browse files</span>
        </div>
      ) : (
        <div className="preview-wrap">
          <img src={preview} alt="Uploaded chest X-ray preview" />
          <div className="preview-meta">
            <div>
              <div className="file-name">{file?.name}</div>
              <div>{file ? formatSize(file.size) : ""}</div>
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={() => { setError(""); onRemove(); }}
            >
              <Trash2 size={15} /> Remove
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {error && (
        <div className="alert" role="alert">
          <AlertCircle size={17} /> <span>{error}</span>
        </div>
      )}
    </div>
  );
}
