import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "./styles.css";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found.");
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
