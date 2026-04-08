import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section id="contact" className="animate-fade-in rounded-[2rem] border border-slate-200 bg-slate-900/95 p-6 sm:p-8 md:p-12 text-white shadow-soft backdrop-blur-xl dark:border-slate-800">
      <div className="max-w-3xl space-y-4 sm:space-y-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-400">Let’s collaborate</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">Ready to turn your idea into something real?</h2>
        <p className="leading-6 sm:leading-8 text-slate-300 text-sm sm:text-base">
          Send a message to discuss your next product, partnership, or freelance project. I’m open to both creative and strategic engagements.
        </p>
        <Button href="#contact">Contact me</Button>
      </div>
    </section>
  );
}
