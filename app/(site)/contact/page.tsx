import ContactForm from "../../../components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 md:p-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Contact</h1>
        <p className="mt-4 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
          Use the form below to share your project details, timelines, or questions. I’ll respond as soon as possible.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
