// utils/jobMailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,   // “from” ID
    pass: process.env.EMAIL_PASS,
  },
});

export const sendJobApplicationEmail = async (jobEmail, applicant) => {
  // ✨ fallback agar recruiter ka email nahi mila
  const recipient =
    jobEmail?.trim() ||
    process.env.DEFAULT_JOB_EMAIL ||      // optional: set alag env var
    process.env.EMAIL_USER;              // last‑resort fallback

  const {
    jobTitle,
    name,
    email,
    phone,
    summary,
    education,
    experience,
    resumeUrl,
    profilePic,
    linkedinUrl,
    portfolioUrl,
  } = applicant;

  await transporter.sendMail({
    from: `"💼 Job Pilot" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: `New application for ${jobTitle}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;">
        <h2 style="margin-bottom:8px;">${jobTitle}</h2>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            ${
              profilePic
                ? `<td style="padding-right:12px;">
                     <img src="${profilePic}" alt="${name}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;" />
                   </td>`
                : ""
            }
            <td>
              <p style="margin:4px 0;"><strong>Name:</strong> ${name}</p>
              ${
                email
                  ? `<p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>`
                  : ""
              }
              ${
                phone
                  ? `<p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>`
                  : ""
              }
            </td>
          </tr>
        </table>

        ${
          summary
            ? `<p style="margin:8px 0;"><strong>Summary:</strong> ${summary}</p>`
            : ""
        }
        ${
          education
            ? `<p style="margin:4px 0;"><strong>Education:</strong> ${education}</p>`
            : ""
        }
        ${
          experience
            ? `<p style="margin:4px 0;"><strong>Experience:</strong> ${experience}</p>`
            : ""
        }
        ${
          linkedinUrl
            ? `<p style="margin:4px 0;"><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>`
            : ""
        }
        ${
          portfolioUrl
            ? `<p style="margin:4px 0;"><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>`
            : ""
        }
        ${
          resumeUrl
            ? `<p style="margin:8px 0;">
                 <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a>
               </p>`
            : ""
        }
        ${
          profilePic
            ? `<p style="margin:8px 0;">
                 <a href="${profilePic}" target="_blank" rel="noopener noreferrer">View Profile Picture</a>
               </p>`
            : ""
        }
      </div>
    `,
  });
};
