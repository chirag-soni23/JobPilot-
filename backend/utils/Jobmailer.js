// utils/jobMailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendJobApplicationEmail = async (jobEmail, applicant) => {
  const { jobTitle, name, email, phone, resumeUrl, linkedinUrl, portfolioUrl } = applicant;

  await transporter.sendMail({
    from: `"💼 Job Pilot" <${process.env.EMAIL_USER}>`,
    to: jobEmail,
    subject: `New application for ${jobTitle}`,
    html: `
      <h2 style="margin-bottom:8px;">${jobTitle}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ""}
      ${portfolioUrl ? `<p><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>` : ""}
      ${
        resumeUrl
          ? `<p><a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a></p>`
          : ""
      }
    `,
  });
};
