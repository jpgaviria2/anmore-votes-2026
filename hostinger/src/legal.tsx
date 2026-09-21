import React from "react";
import { createRoot } from "react-dom/client";
import { LegalPage } from "../../app/legal/legal-page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><LegalPage /></React.StrictMode>,
);
