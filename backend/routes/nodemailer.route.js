import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();

// Preflight (CORS) for this path — optional but helpful
route.options("/send-email", (_req, res) => res.sendStatus(204));

route.post("/send-email", async (req, res) => {
  try {
    const { name = "", email = "", phone = "", message = "" } = req.body || {};

    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({ ok: false, message: "Name, email & message required" });
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ ok: false, message: "EMAIL_USER / EMAIL_PASS missing on server" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS on 587
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // Gmail App Password (NOT normal pwd)
      },
    });

    // Optional: verify SMTP connectivity (great for debugging)
    await transporter.verify();

    const mailOptions = {
      from: `JobPilot <${process.env.EMAIL_USER}>`, // ✅ always your verified sender
      replyTo: `${name} <${email}>`,                // ✅ user goes here
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Form Submission - JobPilot",
      text: `From: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html><html><body style="font-family:Inter,Arial,sans-serif;background:#f5f7fa;margin:0;padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
            <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.07);overflow:hidden">
              <tr style="background:#0047ab;color:#fff"><td style="padding:24px 32px;text-align:center">
                <h1 style="margin:0;font-size:22px">💼 JobPilot</h1>
                <p style="margin:6px 0 0;opacity:.9">Contact Form Submission</p>
              </td></tr>
              <tr><td style="padding:28px 32px;color:#2e2e2e">
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
                <div style="margin-top:14px;background:#f9fafc;border-left:4px solid #0047ab;padding:14px 16px;line-height:1.6">
                  ${escapeHtml(String(message)).replace(/\n/g, "<br>")}
                </div>
              </td></tr>
              <tr><td style="background:#f1f3f5;padding:18px 32px;text-align:center;color:#7d8b99;font-size:13px">
                This email was sent from JobPilot’s official contact form.
              </td></tr>
            </table>
          </td></tr></table>
        </body></html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, message: "Email sent successfully!", id: info.messageId });
  } catch (error) {
    console.error("MAIL ERROR:", error?.code, error?.response || error?.message || error);
    return res.status(500).json({
      ok: false,
      message: "Failed to send email",
      code: error?.code || null,
      reason: error?.response || error?.message || null,
    });
  }
});

// tiny helper to avoid HTML injection
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default route;
