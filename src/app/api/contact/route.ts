import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type ContactBody = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error("CONTACT_EMAIL is not set in environment.");
      return NextResponse.json(
        { error: "Email is not configured. Please set CONTACT_EMAIL." },
        { status: 500 }
      );
    }

    const fromEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? recipientEmail;
    const fromName = process.env.SMTP_FROM_NAME ?? "YorkieCharm Puppies";
    const fromAddress = fromName ? `"${fromName}" <${fromEmail}>` : fromEmail;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>New Contact Form Message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <h3>Message</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p><em>You can reply directly to ${email}</em></p>
    `;

    const text = `
New Contact Form Message
From: ${name} <${email}>
${phone ? `Phone: ${phone}` : ""}
Subject: ${subject}

Message:
${message}

---
Reply to: ${email}
    `.trim();

    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: `[YorkieCharm] ${subject}`,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
