import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX component written in plain JavaScript
import MedAIApp from "../components/MedAIApp.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedAI — Multimodal Disease Diagnosis Assistant" },
      {
        name: "description",
        content:
          "Upload a chest X-ray and patient symptoms to get AI-assisted disease probability insights. Research prototype, not a medical diagnosis.",
      },
      { property: "og:title", content: "MedAI — Multimodal Disease Diagnosis Assistant" },
      {
        property: "og:description",
        content:
          "AI-powered chest X-ray and symptom analysis dashboard for medical research demos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MedAIApp />;
}
