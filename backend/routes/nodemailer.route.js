import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();

route.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: "📩 New Contact Form Submission - JobPilot",
    text: `From: ${name}\nEmail: ${email}\nPhone: ${
      phone || "N/A"
    }\n\nMessage:\n${message}`,
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>JobPilot Contact Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="620" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07); overflow: hidden;">
            
            <!-- Header -->
            <tr style="background-color: #0047ab;">
              <td style="padding: 35px 50px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; margin: 0;">💼 JobPilot</h1>
                <p style="color: #dbe6f7; font-size: 15px; margin-top: 6px;">Contact Form Submission</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 35px 50px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 15px; color: #2e2e2e; padding-bottom: 10px;"><strong>Name:</strong> ${name}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; color: #2e2e2e; padding-bottom: 10px;"><strong>Email:</strong> ${email}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; color: #2e2e2e; padding-bottom: 10px;"><strong>Phone:</strong> ${
                      phone || "N/A"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; color: #2e2e2e; padding-top: 20px;"><strong>Message:</strong></td>
                  </tr>
                  <tr>
                    <td style="background-color: #f9fafc; border-left: 4px solid #0047ab; padding: 18px 20px; margin-top: 8px; font-size: 14.5px; color: #4a4a4a; line-height: 1.7;">
                      ${message.replace(/\n/g, "<br>")}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 25px 50px; background-color: #f1f3f5; text-align: center;">
                <p style="font-size: 13px; color: #7d8b99; margin: 0;">
                  This email was sent from JobPilot’s official contact form.<br>
                  If you believe this was sent in error, please disregard.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

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
