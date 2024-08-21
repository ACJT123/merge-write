import { useEffect } from "react";
import DocumentCard from "../components/document-card";

export default function Documents() {
  useEffect(() => {
    console.log("Documents page loaded");
  }, []);

  return (
    <div>
      <h1>Documents</h1>

      <div>
        <DocumentCard blank />
      </div>
    </div>
  );
}
