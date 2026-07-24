"use client";

import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";

type UploadFieldProps = {
  label: string;
  name: string;
  accept: string;
  onUploadComplete?: (url: string) => void;
  placeholder?: string;
};

export default function UploadField({ label, name, accept, onUploadComplete, placeholder }: UploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const url = data.url;
      setUploadedUrl(url);
      onUploadComplete?.(url);
      toast.success(`${label} uploaded successfully.`);
    } catch {
      toast.error(`Failed to upload ${label.toLowerCase()}.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleUpload}
        className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
      {uploading ? <p className="text-sm text-slate-500">Uploading...</p> : null}
      {uploadedUrl ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">Uploaded: {uploadedUrl}</p>
      ) : placeholder ? (
        <p className="text-sm text-slate-500">{placeholder}</p>
      ) : null}
    </div>
  );
}
