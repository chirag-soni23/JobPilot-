import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobData } from "../context/JobContext";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getJobById, updateJob, singleJob, btnLoading } = JobData();

  const [form, setForm] = useState({
    title: "",
    type: "FULL-TIME",
    company: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    requirements: [],
    desirable: [],
    benefits: [],
    education: "",
    jobLevel: "",
    experience: "",
    expireDate: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    mail: "",
    isFeatured: false,
  });

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    getJobById(id);
  }, [id]);

  useEffect(() => {
    if (!singleJob || singleJob._id !== id) return;

    setForm({
      ...form,
      title: singleJob.title,
      type: singleJob.type,
      company: singleJob.company,
      location: singleJob.location,
      minSalary: singleJob.minSalary,
      maxSalary: singleJob.maxSalary,
      description: singleJob.description,
      requirements: singleJob.requirements,
      desirable: singleJob.desirable,
      benefits: singleJob.benefits,
      education: singleJob.education,
      jobLevel: singleJob.jobLevel,
      experience: singleJob.experience,
      expireDate: new Date(singleJob.expireDate).toISOString().slice(0, 10),
      linkedin: singleJob.shareLinks?.linkedin || "",
      twitter: singleJob.shareLinks?.twitter || "",
      facebook: singleJob.shareLinks?.facebook || "",
      mail: singleJob.shareLinks?.mail || "",
      isFeatured: singleJob.isFeatured,
    });
  }, [singleJob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, key) => {
    const arr = e.target.value.split(",").map((item) => item.trim());
    setForm((prev) => ({ ...prev, [key]: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (["requirements", "desirable", "benefits"].includes(key)) {
        form[key].forEach((item) => formData.append(key, item));
      } else if (["linkedin", "twitter", "facebook", "mail"].includes(key)) {
        formData.append(`shareLinks[${key}]`, form[key]);
      } else {
        formData.append(key, form[key]);
      }
    });

    if (logo) formData.append("file", logo);

    await updateJob(id, formData);
    navigate("/findjobs");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6"
      >
        {[
          "title",
          "company",
          "location",
          "minSalary",
          "maxSalary",
          "education",
          "jobLevel",
          "experience",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                ["minSalary", "maxSalary"].includes(field) ? "number" : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder={`Enter ${field}`}
              required={[
                "title",
                "company",
                "location",
                "minSalary",
                "maxSalary",
              ].includes(field)}
            />
          </div>
        ))}

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Job Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="FULL-TIME">Full-Time</option>
            <option value="PART-TIME">Part-Time</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>

        <div className="form-group col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Job Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter job description"
            required
          />
        </div>

        {["requirements", "desirable", "benefits"].map((field) => (
          <div className="form-group col-span-2" key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 capitalize">
              {field}
            </label>
            <input
              type="text"
              value={form[field].join(", ")}
              onChange={(e) => handleArrayChange(e, field)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder={`Enter comma separated ${field}`}
            />
          </div>
        ))}

        <div className="form-group col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            value={form.expireDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <label className="text-sm text-gray-700 dark:text-white">
            Mark as Featured
          </label>
        </div>

        {["linkedin", "twitter", "facebook", "mail"].map((field) => (
          <div className="form-group" key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder={`Enter ${field} url`}
            />
          </div>
        ))}

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Company Logo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={btnLoading}
          className={`col-span-2 bg-indigo-600 text-white font-medium py-3 rounded transition ${
            btnLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {btnLoading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </section>
  );
};

export default EditJob;
