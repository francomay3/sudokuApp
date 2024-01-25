import React from "react";
import ReactDOM from "react-dom/client";
import SudokuApp from "./SudokuApp.tsx";
import Layout from "./components/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <SudokuApp />
    </Layout>
  </React.StrictMode>
);
