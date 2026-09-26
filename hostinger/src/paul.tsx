import React from "react";
import { createRoot } from "react-dom/client";
import { PaulProfile } from "../../app/Paul/paul-profile";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><PaulProfile /></React.StrictMode>,
);
