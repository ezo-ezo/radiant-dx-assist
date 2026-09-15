import axios from "axios";

// Base URL of your running FastAPI backend
export const API_BASE_URL = "http://127.0.0.1:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

/**
 * Sends the multipart/form-data payload to the FastAPI /predict endpoint.
 * formData must contain: image, symptoms, age, medical_history
 */
export async function predictDisease(formData) {
  const response = await client.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export default { predictDisease, API_BASE_URL };
