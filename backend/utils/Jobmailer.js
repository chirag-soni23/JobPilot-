import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendJobApplicationEmail = async (jobEmail, applicant) => {
  const recipient =
    jobEmail?.trim() || process.env.DEFAULT_JOB_EMAIL || process.env.EMAIL_USER;

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
      <div style="font-family:'Segoe UI', Tahoma, sans-serif; max-width:600px; margin:0 auto; padding:24px; background:linear-gradient(145deg, #ffffff, #f1f1f1); border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); color:#2c2c2c;">
        <h2 style="color:#1a73e8; border-bottom:2px solid #e0e0e0; padding-bottom:10px; margin-bottom:20px;">💼 Application for <span style="color:#000;">${jobTitle}</span></h2>

        <table style="width:100%; border-collapse:collapse;">
          <tr>
            ${
              profilePic
                ? `<td style="width:90px; vertical-align:top;">
                     <img src="${profilePic}" alt="${name}" style="width:80px;height:80px;border-radius:12px;object-fit:cover;border:3px solid #1a73e8;" />
                   </td>`
                : ""
            }
            <td style="padding-left:20px;">
              <p style="margin:4px 0;font-size:15px;"><strong>Name:</strong> ${name}</p>
              ${
                email
                  ? `<p style="margin:4px 0;font-size:15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#1a73e8;text-decoration:none;">${email}</a></p>`
                  : ""
              }
              ${
                phone
                  ? `<p style="margin:4px 0;font-size:15px;"><strong>Phone:</strong> ${phone}</p>`
                  : ""
              }
            </td>
          </tr>
        </table>

        <div style="margin-top:24px; font-size:15px; line-height:1.6;">
          ${
            summary ? `<p><strong>💬 Summary:</strong><br />${summary}</p>` : ""
          }
          ${
            education
              ? `<p><strong>🎓 Education:</strong><br />${education}</p>`
              : ""
          }
          ${
            experience
              ? `<p><strong>🧑‍💻 Experience:</strong><br />${experience}</p>`
              : ""
          }
          ${
            linkedinUrl
              ? `<p><strong>🔗 LinkedIn:</strong><br /><a href="${linkedinUrl}" target="_blank" style="color:#1a73e8;">${linkedinUrl}</a></p>`
              : ""
          }
          ${
            portfolioUrl
              ? `<p><strong>🌐 Portfolio:</strong><br /><a href="${portfolioUrl}" target="_blank" style="color:#1a73e8;">${portfolioUrl}</a></p>`
              : ""
          }
        </div>

        <div style="margin-top:24px;">
          ${
            resumeUrl
              ? `<a href="${resumeUrl}" target="_blank" style="display:inline-block; margin-bottom:10px; padding:10px 20px; background-color:#1a73e8; color:#fff; border-radius:6px; text-decoration:none; font-weight:bold;">📄 View Resume</a><br/>`
              : ""
          }
          ${
            profilePic
              ? `<a href="${profilePic}" target="_blank" style="color:#1a73e8; text-decoration:none;">🖼️ View Profile Picture</a>`
              : ""
          }
        </div>

        <p style="margin-top:32px; font-size:12px; color:#888;">This email was automatically sent by <strong>Job Pilot</strong>. Please do not reply.</p>
      </div>
    `,
  });
};
