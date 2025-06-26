import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const route = express.Router();

route.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
  from: `"${name}" <${email}>`,
  to: process.env.EMAIL_USER,
  text: `From: ${name}\nEmail: ${email}\nPhone: ${
    phone || "N/A"
  }\n\nMessage:\n${message}`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JobPilot Email</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <h2 style="margin: 0; font-size: 24px; color: #333;">💼 JobPilot</h2>
      </div>
      <h3 style="color: #333;">📩 New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      <hr style="margin: 10px 0;">
    </div>
  </body>
  </html>
  `,
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

export default route;
