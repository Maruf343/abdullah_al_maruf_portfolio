import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

export default function Input({ label, name, type = "text", textarea = false, className = "", ...props }: InputProps) {
  const shared = "w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-100";

  return (
    <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
      <span>{label}</span>
      {textarea ? (
        <textarea name={name} className={`${shared} ${className}`} rows={5} {...props} />
      ) : (
        <input name={name} type={type} className={`${shared} ${className}`} {...props} />
      )}
    </label>
  );
}
