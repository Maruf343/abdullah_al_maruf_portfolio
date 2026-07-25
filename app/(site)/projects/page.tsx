import type { Metadata } from "next";
import ProjectsDirectory from "../../../components/sections/ProjectsDirectory";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Projects | Portfolio",
  description: "Browse all featured portfolio projects with search, category filters, and quick links.",
};

export default async function ProjectsPage() {
  const projects = await withDbFallback(
    () =>
      prisma.project.findMany({
        orderBy: [{ featured: "desc" }, { order: "asc" }],
      }),
    []
  );

  return <ProjectsDirectory projects={projects} />;
}
