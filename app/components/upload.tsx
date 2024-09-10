"use client";

import { Session } from "next-auth";
import { useState } from "react";

function Upload({ session }: { session: Session | null }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState<{
    success: string[];
    error: string[];
  }>({ success: [], error: [] });
  const [summaryMessage, setSummaryMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length || !session?.user?.id) {
      setMessages((prev) => ({
        ...prev,
        error: [
          ...prev.error,
          "Please select files and ensure you're logged in.",
        ],
      }));
      return;
    }

    setUploading(true);
    setMessages({ success: [], error: [] });
    setSummaryMessage("");

    const uploadResults = await Promise.all(
      selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", session?.user?.id as string);

        try {
          const res = await fetch("/api/upload-photo", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (res.ok) {
            return {
              success: true,
              message: `${file.name} uploaded successfully!`,
            };
          } else {
            return {
              success: false,
              message: `Failed to upload ${file.name}! ${data.message}`,
            };
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return {
            success: false,
            message: `Error uploading ${file.name}! ${errorMessage}`,
          };
        }
      })
    );

    const successfulUploads = uploadResults.filter((result) => result.success);
    const failedUploads = uploadResults.filter((result) => !result.success);

    setMessages({
      success: successfulUploads.map((result) => result.message),
      error: failedUploads.map((result) => result.message),
    });

    setSummaryMessage(
      `${successfulUploads.length} item(s) uploaded, ${failedUploads.length} failed!`
    );

    setUploading(false);
    setSelectedFiles([]);
  };

  if (!session || !session.user) return null;

  return (
    <div>
      <h2>Upload Photos</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Photos"}
      </button>
      {uploading && <p>Loading...</p>}
      {summaryMessage && <p>{summaryMessage}</p>}
      {messages.success.map((msg, index) => (
        <p key={index} style={{ color: "green" }}>
          {msg}
        </p>
      ))}
      {messages.error.map((msg, index) => (
        <p key={index} style={{ color: "red" }}>
          {msg}
        </p>
      ))}
    </div>
  );
}

export default Upload;
