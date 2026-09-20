import React from "react";
import { createRoot } from "react-dom/client";
import { CandidateResponseForm } from "../../app/candidate-response/response-form";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><CandidateResponseForm /></React.StrictMode>,
);
