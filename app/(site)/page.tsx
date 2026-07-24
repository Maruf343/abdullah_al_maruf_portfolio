import Hero from "../../components/sections/Hero";
import Projects from "../../components/sections/Projects";
import AboutMe from "../../components/sections/AboutMe";
import Skills from "../../components/sections/Skills";
import TechNews from "../../components/sections/TechNews";
import ContactForm from "../../components/sections/ContactForm";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [heroContent, projects, aboutContent, skills] = await Promise.all([
    prisma.heroContent.findFirst(),
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
    prisma.aboutContent.findFirst(),
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
  ]);

  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-24 pb-16 sm:pb-20 md:pb-24">
      <Hero heroContent={heroContent} />
      <Projects projects={projects} />
      <AboutMe aboutContent={aboutContent} cvUrl={heroContent?.cvUrl ?? null} />
      <Skills skills={skills} />
      <TechNews />
      <ContactForm />
    </div>
  );
}
