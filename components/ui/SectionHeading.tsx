type SectionHeadingProps = {
  title: string;
  subtitle: string;
  id?: string;
};

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div id={id} className="animate-fade-in space-y-3">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{subtitle}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{title}</h2>
    </div>
  );
}
