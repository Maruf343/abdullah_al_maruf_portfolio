"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export type ProjectActionState = {
  success: boolean;
  message?: string;
  error?: string;
};

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

async function saveImageFile(formData: FormData) {
  const imageFile = formData.get("image") as File | null;

  if (!imageFile || typeof imageFile === "string" || imageFile.size === 0) {
    const fallbackUrl = formData.get("imageUrl")?.toString().trim();
    return fallbackUrl || "";
  }

  const safeName = imageFile.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
  const fileName = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "projects");
  await mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  const bytes = await imageFile.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  return `/images/projects/${fileName}`;
}

export async function createProject(_prevState: ProjectActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const title = formData.get("title")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const liveUrl = formData.get("liveUrl")?.toString().trim() || "";
  const repoUrl = formData.get("repoUrl")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "Other";
  const order = Number(formData.get("order") || 0);
  const featured = formData.get("featured") === "on";
  const techStackValue = formData.get("techStack")?.toString().trim() || "";
  const techStack = techStackValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !description || !liveUrl || !repoUrl) {
    return { success: false, error: "Please fill in the required project fields." };
  }

  try {
    const imageUrl = await saveImageFile(formData);

    if (!imageUrl) {
      return { success: false, error: "Please upload an image or provide an image URL." };
    }

    await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        imageUrl,
        liveUrl,
        repoUrl,
        category,
        featured,
        order,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin");

    return { success: true, message: "Project created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not create the project. Please try again." };
  }
}

export async function updateProject(_prevState: ProjectActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const liveUrl = formData.get("liveUrl")?.toString().trim() || "";
  const repoUrl = formData.get("repoUrl")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "Other";
  const order = Number(formData.get("order") || 0);
  const featured = formData.get("featured") === "on";
  const techStackValue = formData.get("techStack")?.toString().trim() || "";
  const techStack = techStackValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !description || !liveUrl || !repoUrl) {
    return { success: false, error: "Please fill in the required project fields." };
  }

  try {
    const existingProject = await prisma.project.findUnique({ where: { id } });
    const imageUrl = await saveImageFile(formData);
    const nextImageUrl = imageUrl || existingProject?.imageUrl || "";

    if (!nextImageUrl) {
      return { success: false, error: "Please upload an image or provide an image URL." };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        techStack,
        imageUrl: nextImageUrl,
        liveUrl,
        repoUrl,
        category,
        featured,
        order,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin");

    return { success: true, message: "Project updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not update the project. Please try again." };
  }
}

export async function deleteProject(id: number) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    return { success: true, message: "Project deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not delete the project. Please try again." };
  }
}
