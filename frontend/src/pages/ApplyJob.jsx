import { useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { UserData } from "../context/UserContext";

const ApplyJob = () => {
  const {user} = UserData();
  const [data, setData] = useState({
    fullName: user.name,
    email: user.email,
    mobileNumber: "",
    education:
      "Bachelor of Computer Applications (BCA), Computer Science\nGLA University, Mathura\n2024 - 2027",
    experience:
      "Full Stack Development - Skill Academy by Testbook\nOct 2023 - Nov 2023 (1 month)",
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
  });

  const { getRootProps: picRoot, getInputProps: picInput } = useDropzone({
    onDrop: onDrop("profilePic"),
    accept: { "image/*": [] },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.fullName}
            </h2>
            <p className="text-gray-500 dark:text-gray-300">{data.email}</p>
          </div>
          <button className="text-blue-600 hover:underline text-sm font-medium">
            <Upload className="inline w-4 h-4 mr-1" /> Download
          </button>
        </div>

        <Section title="Mobile Number">
          <input
            type="number"
            name="mobileNumber"
            value={data.mobileNumber}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="w-full bg-transparent outline-none text-sm"
          />
        </Section>

        <Section title="Career Objective">
          <EditableText value="Aspiring Full Stack Developer with expertise in the MERN stack..." />
        </Section>

        <Section title="Education">
          <EditableText value={data.education} />
        </Section>

        <Section title="Work Experience">
          <EditableText value={data.experience} />
        </Section>

        <Section title="LinkedIn Profile">
          <EditableText
            value={data.linkedinUrl}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </Section>

        <Section title="Portfolio URL">
          <EditableText
            value={data.portfolioUrl}
            placeholder="https://your-portfolio.com"
          />
        </Section>

        <Section title="Resume">
          <div {...resRoot()} className="dropzone">
            <input {...resInput()} />
            {data.resume ? data.resume.name : "Click or drag to upload resume"}
          </div>
        </Section>

        <Section title="Profile Picture">
          <div {...picRoot()} className="dropzone">
            <input {...picInput()} />
            {data.profilePic
              ? data.profilePic.name
              : "Click or drag to upload profile picture"}
          </div>
        </Section>

        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Submit Application
        </button>
      </div>
    </div>
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

const EditableText = ({ value, placeholder = "" }) => (
  <textarea
    className="w-full bg-transparent outline-none resize-none text-sm"
    defaultValue={value}
    placeholder={placeholder}
  />
);

export default ApplyJob;
