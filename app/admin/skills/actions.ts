"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export type SkillActionState = {
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

function resolveCategory(category: string, customCategory: string) {
  const normalized = (customCategory || category || "").trim();
  return normalized || "Other";
}

export async function createSkill(_prevState: SkillActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const name = formData.get("name")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "";
  const customCategory = formData.get("customCategory")?.toString().trim() || "";
  const icon = formData.get("icon")?.toString().trim() || "";
  const proficiency = Number(formData.get("proficiency") || 0);
  const order = Number(formData.get("order") || 0);

  if (!name) {
    return { success: false, error: "Please provide a skill name." };
  }

  if (proficiency < 1 || proficiency > 100) {
    return { success: false, error: "Proficiency must be between 1 and 100." };
  }

  try {
    await prisma.skill.create({
      data: {
        name,
        category: resolveCategory(category, customCategory),
        icon: icon || "FaCode",
        proficiency,
        order,
      },
    });

    revalidatePath("/admin/skills");
    revalidatePath("/admin");

    return { success: true, message: "Skill created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not create the skill. Please try again." };
  }
}

export async function updateSkill(_prevState: SkillActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "";
  const customCategory = formData.get("customCategory")?.toString().trim() || "";
  const icon = formData.get("icon")?.toString().trim() || "";
  const proficiency = Number(formData.get("proficiency") || 0);
  const order = Number(formData.get("order") || 0);

  if (!name) {
    return { success: false, error: "Please provide a skill name." };
  }

  if (proficiency < 1 || proficiency > 100) {
    return { success: false, error: "Proficiency must be between 1 and 100." };
  }

  try {
    await prisma.skill.update({
      where: { id },
      data: {
        name,
        category: resolveCategory(category, customCategory),
        icon: icon || "FaCode",
        proficiency,
        order,
      },
    });

    revalidatePath("/admin/skills");
    revalidatePath("/admin");

    return { success: true, message: "Skill updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not update the skill. Please try again." };
  }
}

export async function deleteSkill(id: number) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    return { success: true, message: "Skill deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not delete the skill. Please try again." };
  }
}
