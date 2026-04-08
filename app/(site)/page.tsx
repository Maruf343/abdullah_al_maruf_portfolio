import Hero from "../../components/sections/Hero";
import Projects from "../../components/sections/Projects";
import AboutMe from "../../components/sections/AboutMe";
import Skills from "../../components/sections/Skills";
import TechNews from "../../components/sections/TechNews";
import ContactForm from "../../components/sections/ContactForm";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-24 pb-16 sm:pb-20 md:pb-24">
      <Hero />
      <Projects />
      <AboutMe />
      <Skills />
      <TechNews />
      <ContactForm />
    </div>
  );
}
