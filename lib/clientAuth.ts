"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export type ClientAuthActionState = {
  success: boolean;
  message?: string;
  error: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

function isStrongPassword(password: string) {
  return PASSWORD_REGEX.test(password);
}

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendResetPasswordEmail(email: string, resetUrl: string) {
  const transporter = createTransport();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your client password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 12px;">Password reset request</h2>
        <p>We received a request to reset the password for your client account.</p>
        <p>Use the link below to set a new password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in one hour.</p>
      </div>
    `,
    text: `Reset your password: ${resetUrl}`,
  });
}

export async function registerClient(_prevState: ClientAuthActionState | undefined, formData: FormData): Promise<ClientAuthActionState> {
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const company = formData.get("company")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  if (!name || !email || !password || !confirmPassword) {
    return { success: false, message: "", error: "Please complete all required fields." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "", error: "Please enter a valid email address." };
  }

  if (!isStrongPassword(password)) {
    return { success: false, message: "", error: "Password must contain at least 8 characters, including a letter and a number." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "", error: "Passwords do not match." };
  }

  if (email === process.env.ADMIN_EMAIL?.toLowerCase()) {
    return { success: false, message: "", error: "This email is reserved for the administrator." };
  }

  const existingClient = await prisma.client.findUnique({ where: { email } });
  if (existingClient) {
    return { success: false, message: "", error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.client.create({
    data: {
      name,
      email,
      company: company || null,
      passwordHash,
    },
  });

  return {
    success: true,
    message: "Account created successfully. Please sign in.",
    error: "",
  };
}

export async function requestPasswordReset(_prevState: ClientAuthActionState | undefined, formData: FormData): Promise<ClientAuthActionState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";

  if (!isValidEmail(email)) {
    return { success: false, message: "", error: "Please enter a valid email address." };
  }

  const client = await prisma.client.findUnique({ where: { email } });

  if (client) {
    const recentRequestCount = await prisma.passwordResetToken.count({
      where: {
        clientId: client.id,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
    });

    if (recentRequestCount >= 3) {
      return {
        success: true,
        message: "If that email is registered, we’ve sent a reset link.",
        error: "",
      };
    }

    await prisma.passwordResetToken.deleteMany({ where: { clientId: client.id, usedAt: null, expiresAt: { lt: new Date() } } });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        clientId: client.id,
        token,
        expiresAt,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
    await sendResetPasswordEmail(client.email, resetUrl);
  }

  return {
    success: true,
    message: "If that email is registered, we’ve sent a reset link.",
    error: "",
  };
}

export async function resetClientPassword(_prevState: ClientAuthActionState | undefined, formData: FormData): Promise<ClientAuthActionState> {
  const token = formData.get("token")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  if (!token) {
    return { success: false, message: "", error: "The password reset link is missing or invalid." };
  }

  if (!isStrongPassword(password)) {
    return { success: false, message: "", error: "Password must contain at least 8 characters, including a letter and a number." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "", error: "Passwords do not match." };
  }

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { client: true },
  });

  if (!passwordResetToken || passwordResetToken.usedAt || passwordResetToken.expiresAt < new Date()) {
    return {
      success: false,
      message: "",
      error: "This password reset link is invalid or has expired. Please request a new one.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.client.update({
      where: { id: passwordResetToken.clientId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: passwordResetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return {
    success: true,
    message: "Your password has been reset. Please sign in.",
    error: "",
  };
}
