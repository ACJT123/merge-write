import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Editor from "./pages/editor";
import Menubar from "./components/menubar";
import { DocumentProvider } from "./contexts/documentContext";

function App() {
  return (
    <div className="bg-secondary">
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    </div>
  );
}

export default App;
