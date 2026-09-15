export default function LoadingState() {
  return (
    <div className="glass loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <h3>Analyzing image and symptoms...</h3>
      <p>The multimodal model is processing your X-ray and clinical inputs.</p>
      <div className="bar-track" aria-hidden="true">
        <div className="bar-indeterminate" />
      </div>
    </div>
  );
}
