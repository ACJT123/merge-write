import { useEffect } from "react";

export default function Documents() {
  useEffect(() => {
    console.log("Documents page loaded");
  }, []);

  return (
    <div>
      <h1>Documents</h1>
    </div>
  );
}
