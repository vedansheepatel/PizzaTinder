import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import "../src/index.css";
import App from "./App";

// Create root
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render app
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
