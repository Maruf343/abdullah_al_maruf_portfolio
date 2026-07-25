"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export type AboutContentActionState = {
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

export async function saveAboutContent(_prevState: AboutContentActionState | undefined, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "You need to be signed in to do that." };
  }

  const bio = formData.get("bio")?.toString().trim() || "";
  const profileImageUrl = formData.get("profileImageUrl")?.toString().trim() || "";

  if (!bio) {
    return { success: false, error: "Please provide the about bio." };
  }

  try {
    const existing = await prisma.aboutContent.findFirst();

    if (existing) {
      await prisma.aboutContent.update({
        where: { id: existing.id },
        data: { bio, profileImageUrl },
      });
    } else {
      await prisma.aboutContent.create({
        data: { bio, profileImageUrl },
      });
    }

    revalidatePath("/admin/about");
    revalidatePath("/admin");

    return { success: true, message: "About content updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not save about content. Please try again." };
  }
}
