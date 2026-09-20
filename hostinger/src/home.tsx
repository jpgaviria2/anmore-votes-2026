import React from "react";
import { createRoot } from "react-dom/client";
import { VoterGuide } from "../../app/voter-guide";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><VoterGuide /></React.StrictMode>,
);
