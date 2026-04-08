import type { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  tech: string[];
  children?: ReactNode;
  imageAlt: string;
  imageSrc: string;
};

export default function Card({ title, description, tech, children, imageAlt, imageSrc }: CardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-950">
        <img src={imageSrc} alt={imageAlt} className="h-52 w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
          {tech.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              {item}
            </span>
          ))}
        </div>
        {children}
      </div>
    </article>
  );
}
