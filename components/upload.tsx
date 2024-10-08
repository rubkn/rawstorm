"use client";

import { useState } from "react";

export default function UploadButton() {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        style={{ display: "none" }}
        id="upload-input"
        disabled={uploading}
      />
      <label htmlFor="upload-input">
        <button disabled={uploading} className="btn btn-outline">
          {uploading ? "Uploading..." : "Upload Photos"}
        </button>
      </label>
    </div>
  );
}
