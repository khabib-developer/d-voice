import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: +process.env.SMTP_PORT! || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Configure the email options
    await transporter.sendMail({
      from: `"${name}"`,
      to: process.env.EMAIL_TO, // Replace with your receiving email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
    });

    return new Response(JSON.stringify({ message: "" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("TTS request failed:", error.message);
    return new Response(JSON.stringify({ message: "failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
