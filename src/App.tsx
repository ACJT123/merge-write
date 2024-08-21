import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Editor from "./pages/editor";
import Menubar from "./components/menubar";
import { DocumentProvider } from "./contexts/documentContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Documents from "./pages/documents";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    ),
  },
  {
    path: "/documents",
    element: <Documents />,
  },
]);

function App() {
  return (
    <div className="bg-secondary p-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
