import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Editor from "./pages/editor";
import Tiptap from "./pages/editor";
import Menubar from "./components/menubar";

function App() {
  return (
    <div>
      <Tiptap />
      <Menubar />
    </div>
  );
}

export default App;
