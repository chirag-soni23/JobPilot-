import { useState, useMemo, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { UserData } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobHeader from "../components/ApplyJobHeader";
import { UseJobApply } from "../context/JobApplyContext";
import { toast } from "react-hot-toast";

const ApplyJob = () => {
  const { user } = UserData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { applyJob, applying } = UseJobApply();

  const [data, setData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    mobileNumber: "",
    summary: "",
    education: "",
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
    resume: null,
    profilePic: null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [missing, setMissing] = useState([]);

  const handleChange = (e) =>
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onDrop = (field) => (acceptedFiles) =>
    setData((p) => ({ ...p, [field]: acceptedFiles[0] }));

  const { getRootProps: resRoot, getInputProps: resInput } = useDropzone({
    onDrop: onDrop("resume"),
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
  });

  const { getRootProps: picRoot, getInputProps: picInput } = useDropzone({
    onDrop: onDrop("profilePic"),
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const profilePicURL = useMemo(
    () => (data.profilePic ? URL.createObjectURL(data.profilePic) : ""),
    [data.profilePic]
  );

  useEffect(() => {
    return () => {
      if (profilePicURL) URL.revokeObjectURL(profilePicURL);
    };
  }, [profilePicURL]);

  const requiredKeys = [
    "fullName",
    "email",
    "mobileNumber",
    "summary",
    "education",
    "experience",
    "linkedinUrl",
    "portfolioUrl",
    "resume",
    "profilePic",
  ];

  const getMissingFields = () =>
    requiredKeys.filter((k) => {
      const v = data[k];
      if (k === "resume" || k === "profilePic") return !v;
      return !v || String(v).trim() === "";
    });

  const isComplete = () => getMissingFields().length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isComplete()) {
      const m = getMissingFields();
      setMissing(m);
      setShowPopup(true);
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(
      ([key, value]) => value && formData.append(key, value)
    );

    const success = await applyJob(id, formData, navigate);
    if (success) {
      toast.success("Application submitted!");
    }
  };

  const handleDownload = () => {
    if (!isComplete()) {
      const m = getMissingFields();
      setMissing(m);
      setShowPopup(true);
      return;
    }

    const safe = (v) =>
      (v || "")
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // --- Printable with Lucide-style inline SVGs & attractive UI ---
    const printable = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Job Application - ${safe(data.fullName)}</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; background:#0f172a; }
  .wrap { min-height:100vh; background:
      radial-gradient(1200px 600px at -10% -20%, #4f46e5 0%, transparent 60%),
      radial-gradient(1000px 600px at 110% 0%, #06b6d4 0%, transparent 60%),
      linear-gradient(180deg, #0f172a 0%, #0b1220 100%);
    padding:40px 16px;
  }
  .sheet {
    max-width:900px; margin:0 auto; background:#0b1220cc; border:1px solid #1e293b; backdrop-filter: blur(8px);
    border-radius:20px; overflow:hidden; color:#e2e8f0; box-shadow:0 10px 40px rgba(0,0,0,.35);
  }
  .hero {
    background: linear-gradient(135deg, #312e81 0%, #1e40af 25%, #0ea5e9 100%);
    padding:28px 28px 64px; position: relative;
  }
  .hero .title { margin:0; font-size:26px; font-weight:800; letter-spacing:.4px; display:flex; align-items:center; gap:10px; }
  .hero .tag { font-size:12px; opacity:.9; margin-top:6px; }
  .avatar {
    position:absolute; bottom:-36px; right:28px; width:96px; height:96px; border-radius:16px; overflow:hidden;
    border:4px solid #0b1220; box-shadow:0 10px 24px rgba(0,0,0,.35); background:#0b1220;
  }
  .avatar img { width:100%; height:100%; object-fit:cover; display:block; }
  .grid { display:grid; grid-template-columns: 1.1fr .9fr; gap:18px; padding:24px; }
  .card {
    border:1px solid #1f2937; border-radius:14px; background:linear-gradient(180deg, #0b1220 0%, #0b1220 55%, #0c1426 100%);
    padding:16px 16px 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
  }
  .card + .card { margin-top:14px; }
  .h {
    display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:.3px; font-size:14px; color:#f8fafc; margin-bottom:10px;
  }
  .row { display:flex; align-items:flex-start; gap:12px; margin:8px 0; line-height:1.5; color:#cbd5e1; font-size:14px; }
  .muted { color:#94a3b8; font-size:12px; }
  .chip {
    display:inline-flex; align-items:center; gap:6px; border:1px solid #334155; padding:6px 10px; border-radius:10px; margin:6px 6px 0 0;
    background: rgba(148,163,184,.08);
  }
  .links a {
    color:#93c5fd; text-decoration:none; border-bottom:1px dashed rgba(147,197,253,.45); padding-bottom:1px;
    word-break: break-all;
  }
  .two-col { columns: 2; column-gap:12px; }
  .footer {
    display:flex; justify-content:space-between; align-items:center; padding:14px 24px; border-top:1px solid #1e293b; background:#0b1220e0; font-size:12px; color:#94a3b8;
  }
  .stamp {
    display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid #334155; border-radius:999px;
    background: rgba(148,163,184,.08); font-weight:600; color:#e2e8f0;
  }
  .bar {
    height:4px; width:100%; background:
      linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa, #f472b6);
  }

  .icon { width:18px; height:18px; stroke:#93c5fd; }
  .icon-strong { stroke:#e2e8f0; }

  @media print {
    body { background:#fff; }
    .wrap { padding:0; background:#fff; }
    .sheet { box-shadow:none; background:#fff; color:#020617; border:1px solid #e5e7eb; }
    .hero { background:#f1f5f9; color:#0f172a; }
    .avatar { border-color:#fff; }
    .grid { padding:16px; }
    .card { background:#fff; border:1px solid #e5e7eb; }
    .h { color:#0f172a; }
    .row { color:#1f2937; }
    .muted { color:#475569; }
    .links a { color:#1d4ed8; }
    .footer { background:#f8fafc; color:#334155; }
    .icon { stroke:#0f172a; }
    .icon-strong { stroke:#0f172a; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="sheet">
      <div class="hero">
        <div class="bar"></div>
        <h1 class="title">
          ${svg("file-text", "icon-strong")}
          Job Application
        </h1>
        <div class="tag">Generated from Apply Form</div>
        ${
          profilePicURL
            ? `<div class="avatar"><img src="${profilePicURL}" alt="${safe(
                data.fullName
              )}" /></div>`
            : ``
        }
      </div>

      <div class="grid">
        <div>
          <div class="card">
            <div class="h">${svg("user")} Applicant</div>
            <div class="row">🪪 <strong style="margin-right:6px;">${safe(
              data.fullName
            )}</strong></div>
            <div class="row">${svg("mail")} <span>${safe(
      data.email
    )}</span></div>
            <div class="row">${svg("phone")} <span>${safe(
      data.mobileNumber
    )}</span></div>
          </div>

          <div class="card">
            <div class="h">${svg("message-circle")} Career Objective</div>
            <div class="row"><span>${safe(data.summary)}</span></div>
          </div>

          <div class="card">
            <div class="h">${svg("briefcase")} Work Experience</div>
            <div class="row two-col"><span>${safe(data.experience)}</span></div>
          </div>

          <div class="card">
            <div class="h">${svg("graduation-cap")} Education</div>
            <div class="row"><span>${safe(data.education)}</span></div>
          </div>
        </div>

        <div>
          <div class="card">
            <div class="h">${svg("link")} Links</div>
            <div class="row links">
              ${svg("linkedin")}
              <a href="${safe(data.linkedinUrl)}">${safe(data.linkedinUrl)}</a>
            </div>
            <div class="row links">
              ${svg("globe")}
              <a href="${safe(data.portfolioUrl)}">${safe(
      data.portfolioUrl
    )}</a>
            </div>
            ${
              data.resume
                ? `<div class="row">${svg("paperclip")} <span>${safe(
                    data.resume.name
                  )}</span></div>`
                : ``
            }
            <div class="muted" style="margin-top:8px;">Tip: Click the links to open directly.</div>
          </div>

          <div class="card">
            <div class="h">${svg("award")} Summary</div>
            <div class="chip">${svg("user")} ${safe(data.fullName)}</div>
            <div class="chip">${svg("mail")} ${safe(data.email)}</div>
            <div class="chip">${svg("phone")} ${safe(data.mobileNumber)}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <span style="color:black" class="stamp">${svg(
          "calendar"
        )} Saved on ${new Date().toLocaleString()}</span>
        <span class="muted">Powered by your Job Portal</span>
      </div>
    </div>
  </div>

  <!-- Inline Lucide-like icons -->
  <svg width="0" height="0" style="position:absolute;visibility:hidden" aria-hidden="true" focusable="false">
    <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M4 19v-2a4 4 0 0 1 3-3.87"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </symbol>
    <symbol id="i-id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <circle cx="9" cy="12" r="2"></circle>
      <path d="M15 8h4M15 12h4M15 16h4"></path>
    </symbol>
    <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="M3 7l9 6 9-6"></path>
    </symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.18 2 2 0 0 1 4.11 3h2a2 2 0 0 1 2 1.72c.12.9.31 1.77.57 2.61a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6 6l1.46-1.14a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"></path>
    </symbol>
    <symbol id="i-file-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <path d="M14 2v6h6"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
      <path d="M10 9H8"></path>
    </symbol>
    <symbol id="i-briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2"></rect>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
      <path d="M2 13h20"></path>
    </symbol>
    <symbol id="i-graduation-cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 10L12 4 2 10l10 6 10-6z"></path>
      <path d="M6 12v4a2 2 0 0 0 1 1.73L12 20l5-2.27A2 2 0 0 0 18 16v-4"></path>
    </symbol>
    <symbol id="i-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 1 7 0l1 1a5 5 0 0 1 0 7 5 5 0 0 1-7 0l-1-1"></path>
      <path d="M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 0 7 5 5 0 0 0 7 0l1-1"></path>
    </symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="3"></rect>
      <path d="M8 11v7"></path>
      <circle cx="8" cy="7" r="1"></circle>
      <path d="M12 11v7"></path>
      <path d="M12 14a3 3 0 0 1 6 0v4"></path>
    </symbol>
    <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </symbol>
    <symbol id="i-paperclip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21.44 11.05l-8.49 8.49a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L10 17.44"></path>
    </symbol>
    <symbol id="i-message-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12a8 8 0 0 1-8 8 8.3 8.3 0 0 1-3.6-.8L3 21l1.8-6.4A8 8 0 1 1 21 12z"></path>
    </symbol>
    <symbol id="i-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"></path>
    </symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <path d="M16 2v4M8 2v4M3 10h18"></path>
    </symbol>
  </svg>

  <script>
    function useIcon(name, extraClass) {
      return '<svg class="icon ' + (extraClass||'') + '"><use href="#' + name + '"/></svg>';
    }
    function injectIcons() {
      document.querySelectorAll('[data-i]').forEach(el=>{
        const n = el.getAttribute('data-i');
        el.outerHTML = useIcon(n, el.getAttribute('data-k')||'');
      });
    }
    function svgReady() { injectIcons(); }
    window.addEventListener('DOMContentLoaded', svgReady);
    setTimeout(()=>{ window.print(); setTimeout(()=>window.close(), 300); }, 150);
  </script>

  <script>
    // Replace placeholders with inline <use> (server-side rendered below)
  </script>
</body>
</html>
    `
      .replaceAll(svg("user"), `<span data-i="i-user"></span>`)
      .replaceAll(svg("mail"), `<span data-i="i-mail"></span>`)
      .replaceAll(svg("phone"), `<span data-i="i-phone"></span>`)
      .replaceAll(
        svg("file-text", "icon-strong"),
        `<span data-i="i-file-text" data-k="icon-strong"></span>`
      )
      .replaceAll(svg("briefcase"), `<span data-i="i-briefcase"></span>`)
      .replaceAll(
        svg("graduation-cap"),
        `<span data-i="i-graduation-cap"></span>`
      )
      .replaceAll(svg("link"), `<span data-i="i-link"></span>`)
      .replaceAll(svg("linkedin"), `<span data-i="i-linkedin"></span>`)
      .replaceAll(svg("globe"), `<span data-i="i-globe"></span>`)
      .replaceAll(svg("paperclip"), `<span data-i="i-paperclip"></span>`)
      .replaceAll(
        svg("message-circle"),
        `<span data-i="i-message-circle"></span>`
      )
      .replaceAll(svg("award"), `<span data-i="i-award"></span>`)
      .replaceAll(svg("calendar"), `<span data-i="i-calendar"></span>`);

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(printable);
    w.document.close();
  };

  return (
    <>
      <ApplyJobHeader id={id} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <form
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.fullName || "Your Name"}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">{data.email}</p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              <Upload className="inline w-4 h-4 mr-1" /> Download
            </button>
          </div>

          <Section title="Mobile Number">
            <input
              type="tel"
              name="mobileNumber"
              value={data.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </Section>

          <Section title="Career Objective">
            <textarea
              name="summary"
              value={data.summary}
              onChange={handleChange}
              className="w-full bg-transparent outline-none resize-none text-sm"
              placeholder="Write your objective..."
              required
            />
          </Section>

          <Section title="Education">
            <textarea
              name="education"
              value={data.education}
              onChange={handleChange}
              className="w-full bg-transparent outline-none resize-none text-sm"
              required
            />
          </Section>

          <Section title="Work Experience">
            <textarea
              name="experience"
              value={data.experience}
              onChange={handleChange}
              className="w-full bg-transparent outline-none resize-none text-sm"
              required
            />
          </Section>

          <Section title="LinkedIn Profile">
            <input
              type="url"
              name="linkedinUrl"
              value={data.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </Section>

          <Section title="Portfolio URL">
            <input
              type="url"
              name="portfolioUrl"
              value={data.portfolioUrl}
              onChange={handleChange}
              placeholder="https://your-portfolio.com"
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </Section>

          <Section title="Resume">
            <div
              {...resRoot()}
              className="dropzone cursor-pointer text-sm text-gray-500 dark:text-gray-300"
            >
              <input {...resInput()} required />
              {data.resume
                ? data.resume.name
                : "Click or drag to upload resume"}
            </div>
          </Section>

          <Section title="Profile Picture">
            <div
              {...picRoot()}
              className="dropzone cursor-pointer text-sm text-gray-500 dark:text-gray-300"
            >
              <input {...picInput()} required />
              {data.profilePic
                ? data.profilePic.name
                : "Click or drag to upload profile picture"}
            </div>
          </Section>

          <button
            type="submit"
            disabled={applying}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {applying ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <div className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.335-.213 2.995-1.742 2.995H3.48c-1.53 0-2.492-1.66-1.742-2.995L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Please fill the form first
              </h3>
              {missing.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                  {missing.map((m) => (
                    <li key={m}>{pretty(m)} is required</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-200 uppercase mb-1">
      {title}
    </h3>
    <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 text-sm dark:text-white">
      {children}
    </div>
  </div>
);

const Popup = ({ children, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
  >
    <div
      className="absolute inset-0 bg-black/50"
      onClick={onClose}
      aria-hidden="true"
    />
    <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-2xl p-5">
      {children}
    </div>
  </div>
);

const pretty = (k) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function svg(name, extra = "") {
  return `<span class="icon ${extra}">${name}</span>`;
}

export default ApplyJob;
