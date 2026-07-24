"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteSkill } from "./actions";

export default function DeleteSkillButton({ skillId }: { skillId: number }) {
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this skill?");
    if (!confirmed) return;

    setPending(true);
    const result = await deleteSkill(skillId);
    setPending(false);

    if (result.success) {
      toast.success(result.message || "Skill deleted");
      window.location.reload();
    } else {
      toast.error(result.error || "Unable to delete skill");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="rounded-2xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
