import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createContactEmailTemplate } from "../../../lib/emailTemplates";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const { name = "", email = "", message = "" } = body;

  console.log("Contact request received:", { name, email, message });

  try {
    const savedMessage = await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = createContactEmailTemplate(name, email, message);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Contact: ${name} wants to connect!`,
      html: htmlContent,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for getting in touch! We received your message and stored it in the admin inbox.",
        id: savedMessage.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
