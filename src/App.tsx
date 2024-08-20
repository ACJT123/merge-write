import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Editor from "./pages/editor";
import Menubar from "./components/menubar";

function App() {
  return (
    <div className="bg-secondary">
      <Editor />
    </div>
  );
}

export default App;
