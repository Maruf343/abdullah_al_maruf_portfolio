import Hero from "../../components/sections/Hero";
import Projects from "../../components/sections/Projects";
import AboutMe from "../../components/sections/AboutMe";
import Skills from "../../components/sections/Skills";
import TechNews from "../../components/sections/TechNews";
import ContactForm from "../../components/sections/ContactForm";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <Hero />
      <Projects />
      <AboutMe />
      <Skills />
      <TechNews />
      <ContactForm />
    </div>
  );
}
