import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createContactEmailTemplate } from "../../../lib/emailTemplates";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  console.log("Contact request received:", { name, email, message });

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Create HTML email template
  const htmlContent = createContactEmailTemplate(name, email, message);

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `🚀 New Contact: ${name} wants to connect!`,
    html: htmlContent,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Fallback for email clients that don't support HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        success: true,
        message: "Thanks for getting in touch! We received your message and sent it to our inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
