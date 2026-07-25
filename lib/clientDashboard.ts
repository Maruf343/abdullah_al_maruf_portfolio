"use server";

import { auth } from "../auth";
import { prisma } from "./prisma";

export type ClientDashboardActionState = {
  success: boolean;
  message?: string;
  error: string;
};

export async function submitClientTestimonial(
  _prevState: ClientDashboardActionState | undefined,
  formData: FormData
): Promise<ClientDashboardActionState> {
  const session = await auth();

  if (!session || session.user.role !== "client" || !session.user.id) {
    return {
      success: false,
      message: "",
      error: "Please sign in to submit a testimonial.",
    };
  }

  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const ratingRaw = Number(formData.get("rating")?.toString() || "0");
  const rating = Number.isFinite(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5 ? ratingRaw : null;

  if (!name || !email || !message) {
    return {
      success: false,
      message: "",
      error: "Please complete your name, email, and testimonial message.",
    };
  }

  await prisma.testimonial.create({
    data: {
      name,
      email,
      message,
      rating,
      status: "pending",
      clientId: Number(session.user.id),
    },
  });

  return {
    success: true,
    message: "Your testimonial has been submitted and is awaiting approval.",
    error: "",
  };
}
