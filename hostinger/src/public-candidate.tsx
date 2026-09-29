import React from "react";
import { createRoot } from "react-dom/client";
import { PublicCandidateProfile } from "../../app/public-candidate-profile";
import "../../app/globals.css";

const candidateName = document.getElementById("root")?.dataset.candidate;

if (!candidateName) {
  throw new Error("Public candidate name is missing from the Hostinger entry page");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><PublicCandidateProfile candidateName={candidateName} /></React.StrictMode>,
);
