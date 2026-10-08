import React from "react";
import { createRoot } from "react-dom/client";
import { AllCandidatesMeetingTranscript } from "../../app/all-candidates-meeting/transcript-page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AllCandidatesMeetingTranscript /></React.StrictMode>,
);
