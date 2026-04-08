import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section id="contact" className="animate-fade-in rounded-[2rem] border border-slate-200 bg-slate-900/95 p-8 text-white shadow-soft backdrop-blur-xl dark:border-slate-800 md:p-12">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Let’s collaborate</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to turn your idea into something real?</h2>
        <p className="leading-8 text-slate-300">
          Send a message to discuss your next product, partnership, or freelance project. I’m open to both creative and strategic engagements.
        </p>
        <Button href="/contact">Contact me</Button>
      </div>
    </section>
  );
}
