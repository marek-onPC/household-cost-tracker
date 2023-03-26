import React from "react";
import ReactDOM from "react-dom/client";
import MainStructure from "./layout/MainStructure";
import "/node_modules/primeflex/primeflex.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainStructure />
  </React.StrictMode>
);
