import { useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { UserData } from "../context/UserContext";
import { useParams } from "react-router-dom";
import ApplyJobHeader from "../components/ApplyJobHeader";
import { UseJobApply } from "../context/JobApplyContext";
import { toast } from "react-hot-toast";

const ApplyJob = () => {
  const { user } = UserData();
  const { id } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.fullName ||
      !data.email ||
      !data.mobileNumber ||
      !data.summary ||
      !data.education ||
      !data.experience ||
      !data.linkedinUrl ||
      !data.portfolioUrl ||
      !data.resume ||
      !data.profilePic
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await applyJob(id, formData);
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

export default ApplyJob;
