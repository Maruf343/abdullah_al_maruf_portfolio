"use server";

import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { createReplyEmailTemplate } from "../../../lib/emailTemplates";

type MessageActionState = {
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

export async function markMessageAsRead(formData: FormData) {
  const id = Number(formData.get("id"));

  try {
    await requireAdmin();
  } catch {
    console.error("Unauthorized attempt to mark message as read");
    return;
  }

  try {
    await prisma.message.update({ where: { id }, data: { read: true } });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}

export async function sendReply(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    console.error("Unauthorized attempt to send a reply");
    return;
  }

  const id = Number(formData.get("id"));
  const replyText = formData.get("reply")?.toString().trim() || "";
  const originalName = formData.get("originalName")?.toString().trim() || "";
  const originalEmail = formData.get("originalEmail")?.toString().trim() || "";
  const originalMessage = formData.get("originalMessage")?.toString().trim() || "";

  if (!replyText) {
    return;
  }

  try {
    const message = await prisma.message.findUnique({ where: { id } });

    if (!message) {
      console.error("The selected message could not be found.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: originalEmail || message.email,
      subject: "Re: Your message to Mohammad Abdullah Al Maruf",
      html: createReplyEmailTemplate({
        recipientName: originalName || message.name,
        replyText,
        originalMessage,
      }),
      text: `Hi ${originalName || message.name},\n\n${replyText}\n\nOriginal message:\n${originalMessage}`,
    };

    await transporter.sendMail(mailOptions);

    await prisma.message.update({
      where: { id },
      data: { replied: true, read: true },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Reply failed:", error);
  }
}
