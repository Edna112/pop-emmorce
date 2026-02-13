import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type ContactBreederBody = {
  name: string;
  email: string;
  phone: string;
  message: string;
  puppyId: string;
  puppyName: string;
  breed: string;
  breederName: string;
  puppyPrice?: number;
  puppyLocation?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBreederBody;
    const { name, email, phone, message, puppyId, puppyName, breed, breederName, puppyPrice, puppyLocation } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    const priceLine = puppyPrice != null ? `Price: $${puppyPrice.toLocaleString()}` : "";
    const locationLine = puppyLocation ? `Location: ${puppyLocation}` : "";

    const html = `
      <h2>New Contact Breeder Message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <hr />
      <h3>About the puppy</h3>
      <ul>
        <li><strong>Puppy:</strong> ${puppyName}</li>
        <li><strong>Breed:</strong> ${breed}</li>
        <li><strong>Breeder:</strong> ${breederName}</li>
        ${puppyId ? `<li><strong>Puppy ID:</strong> ${puppyId}</li>` : ""}
        ${priceLine ? `<li>${priceLine}</li>` : ""}
        ${locationLine ? `<li>${locationLine}</li>` : ""}
      </ul>
      <h3>Message</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p><em>You can reply directly to ${email}</em></p>
    `;

    const text = `
New Contact Breeder Message
From: ${name} <${email}>
${phone ? `Phone: ${phone}` : ""}

About the puppy:
- Puppy: ${puppyName}
- Breed: ${breed}
- Breeder: ${breederName}
${puppyId ? `- Puppy ID: ${puppyId}` : ""}
${priceLine ? `- ${priceLine}` : ""}
${locationLine ? `- ${locationLine}` : ""}

Message:
${message}

---
Reply to: ${email}
    `.trim();

    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: `Contact Breeder: ${name} – inquiry about ${puppyName} (${breed})`,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact breeder email error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
