"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProject } from "./actions";

export default function DeleteProjectButton({ projectId }: { projectId: number }) {
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setPending(true);
    const result = await deleteProject(projectId);
    setPending(false);

    if (result.success) {
      toast.success(result.message || "Project deleted");
      window.location.reload();
    } else {
      toast.error(result.error || "Unable to delete project");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="rounded-2xl border border-rose-300 px-3 py-2 text-rose-700 transition hover:bg-rose-50 disabled:opacity-60 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
