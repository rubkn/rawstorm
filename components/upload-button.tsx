"use client";

import { useState, useCallback } from "react";
import { X, Upload, File } from "lucide-react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type UploadFile = {
  file: File;
  previewUrl: string;
};

const MAX_FILES = 8;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

export default function UploadDialog() {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [filesList, setFilesList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    [key: string]: boolean; // true = success, false = failed
  }>({});

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFilesList = acceptedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      // Check the total number of files after the new drop
      if (filesList.length + newFilesList.length > MAX_FILES) {
        toast({
          title: "File limit exceeded!",
          description: `You can upload up to ${MAX_FILES} files. Please remove some before adding more.`,
          variant: "destructive",
        });
        return; // Stop the process if limit exceeded
      }

      // Update the files list
      setFilesList((prevFilesList) => [...prevFilesList, ...newFilesList]);
    },
    [filesList, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: MAX_FILE_SIZE,
  });

  const removeFile = (fileToRemove: UploadFile) => {
    setFilesList((prevFilesList) =>
      prevFilesList.filter((file) => file !== fileToRemove)
    );
    URL.revokeObjectURL(fileToRemove.previewUrl);
  };

  const handleUpload = useCallback(async () => {
    setUploading(true);

    try {
      const uploadPromises = filesList.map(async ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload-photo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        setUploadStatus((prevStatuses) => ({
          ...prevStatuses,
          [file.name]: true, // Mark the file as successfully uploaded
        }));

        return { success: true };
      });

      const results = await Promise.allSettled(uploadPromises);
      const failedFiles = results
        .map((result, index) => ({
          status: result.status,
          fileName: filesList[index].file.name,
        }))
        .filter((result) => result.status === "rejected");

      if (failedFiles.length > 0) {
        const failedFileNames = failedFiles
          .map((file) => file.fileName)
          .join(", ");

        // Update upload status for failed files
        setUploadStatus((prevStatuses) =>
          failedFiles.reduce(
            (acc, file) => ({ ...acc, [file.fileName]: false }),
            prevStatuses
          )
        );

        toast({
          title: "There was an error...",
          description: `${failedFiles.length} file(s) failed to upload: ${failedFileNames}.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "All files uploaded successfully.",
        });

        setFilesList([]);
        setOpen(false);
      }
    } catch (error) {
      console.error("There was an error while uploading.", error);

      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [filesList, toast]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload files</DialogTitle>
            <DialogDescription>
              Drag and drop your files here or click to browse.
            </DialogDescription>
          </DialogHeader>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <File className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm text-primary/50">
              {isDragActive
                ? "Drop the files here"
                : "Drag and drop files here, or click to select files"}
            </p>
            <p className="text-xs text-primary/50 mt-1">
              You can upload up to {MAX_FILES} files (up to{" "}
              {MAX_FILE_SIZE / 1024 / 1024} MB each)
            </p>
          </div>

          {filesList.length > 0 && (
            <div className="mt-4">
              <ul className="space-y-2">
                {filesList.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <img
                        src={file.previewUrl}
                        alt={file.file.name}
                        className="h-12 w-12 mr-2 object-cover rounded-md"
                      />
                      {file.file.name}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filesList.length > 0 && (
            <Button
              className="mt-4 space-x-2 w-full"
              onClick={handleUpload}
              disabled={uploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
