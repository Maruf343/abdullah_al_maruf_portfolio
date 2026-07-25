"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export type HeroContentActionState = {
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

export async function saveHeroContent(_prevState: HeroContentActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const name = formData.get("name")?.toString().trim() || "";
  const tagline = formData.get("tagline")?.toString().trim() || "";
  const rolesValue = formData.get("roles")?.toString().trim() || "";
  const roles = rolesValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const cvUrl = formData.get("cvUrl")?.toString().trim() || "";
  const profileImageUrl = formData.get("profileImageUrl")?.toString().trim() || "";

  if (!name || !tagline) {
    return { success: false, error: "Please provide the hero name and tagline." };
  }

  try {
    const existing = await prisma.heroContent.findFirst();

    if (existing) {
      await prisma.heroContent.update({
        where: { id: existing.id },
        data: { name, tagline, roles, cvUrl, profileImageUrl },
      });
    } else {
      await prisma.heroContent.create({
        data: { name, tagline, roles, cvUrl, profileImageUrl },
      });
    }

    revalidatePath("/admin/hero");
    revalidatePath("/admin");

    return { success: true, message: "Hero content updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not save hero content. Please try again." };
  }
}
