import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 16px; color: #111827;">New message from Edo Forum Abuja</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 12px;">
          <strong>Message:</strong>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "hello@edoforumabuja.org",
      replyTo: email,
      subject: `Edo Forum Abuja: ${subject}`,
      text: emailText,
      html: htmlMessage,
    });

    const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const whatsappTo = process.env.WHATSAPP_TO;

    if (whatsappToken && whatsappPhoneNumberId && whatsappTo) {
      try {
        const whatsappMessage = `New message from Edo Forum Abuja\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

        const whatsappResponse = await fetch(
          `https://graph.facebook.com/v19.0/${whatsappPhoneNumberId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${whatsappToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: whatsappTo,
              type: "text",
              text: { body: whatsappMessage },
            }),
          }
        );

        if (!whatsappResponse.ok) {
          console.warn("WhatsApp delivery failed:", await whatsappResponse.text());
        }
      } catch (whatsappError) {
        console.warn("WhatsApp delivery warning:", whatsappError);
      }
    }

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to send the message right now. Please try again later." },
      { status: 500 }
    );
  }
}
