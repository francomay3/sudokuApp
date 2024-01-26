import React from "react";
import ReactDOM from "react-dom/client";

import Layout from "./components/Layout.tsx";
import SudokuApp from "./SudokuApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <SudokuApp />
    </Layout>
  </React.StrictMode>
);
