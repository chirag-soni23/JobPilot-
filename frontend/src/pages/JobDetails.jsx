import { Bookmark, ArrowRight, MapPin, CoinsIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { assets } from "../assets/assets.js";
import { JobData } from "../context/JobContext.jsx";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const { getJobById, singleJob, toggleSaveJob, savedLoading } = JobData();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) getJobById(id);
  }, [id, getJobById]);

  useEffect(() => {
    if (singleJob) setIsSaved(Boolean(singleJob.isSaved));
  }, [singleJob]);

  const handleSavedJob = useCallback(() => {
    if (!singleJob) return;
    toggleSaveJob(singleJob._id);
    setIsSaved((prev) => {
      const next = !prev;
      return next;
    });
  }, [singleJob, toggleSaveJob]);

  if (!singleJob) return null;

  const scrollTopSmooth = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const {
    title = "",
    company = "",
    type = "",
    isFeatured = false,
    logoUrl,
    description = "",
    requirements = [],
    desirable = [],
    benefits = [],
    minSalary = 0,
    maxSalary = 0,
    location = "",
    postedDate,
    expireDate,
    jobLevel = "",
    experience = "",
    education = "",
    shareLinks = {},
  } = singleJob;

  return (
    <>
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 w-full mx-auto h-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Job Details
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn more about the role and its requirements.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Link
              onClick={scrollTopSmooth}
              className="text-blue-600 hover:underline"
              to="/"
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              onClick={scrollTopSmooth}
              className="text-blue-600 hover:underline"
              to="/findjobs"
            >
              Find Job
            </Link>{" "}
            / {title} / jobdetails
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={logoUrl?.url ?? assets.defaultCompanyLogo}
                alt="Company"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  at{" "}
                  <span className="text-gray-800 dark:text-white font-medium">
                    {company}
                  </span>
                </p>
                <div className="flex gap-2 mt-2 text-xs font-medium">
                  {type && (
                    <span className="bg-green-100 text-green-600 dark:bg-green-300/20 dark:text-green-400 px-2 py-1 rounded">
                      {type}
                    </span>
                  )}
                  {isFeatured && (
                    <span className="bg-red-100 text-red-600 dark:bg-red-300/20 dark:text-red-400 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleSavedJob}
                className="ml-auto p-2 cursor-pointer rounded-md disabled:opacity-60"
                disabled={savedLoading}
              >
                <img
                  className="w-10 h-10"
                  src={isSaved ? assets.saved : assets.save}
                  alt="save"
                />
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
              {description && (
                <div>
                  <h3 className="text-base font-semibold mb-1 dark:text-white">
                    Job Description
                  </h3>
                  <p>{description}</p>
                </div>
              )}

              {!!requirements.length && (
                <div>
                  <h3 className="text-base font-semibold mb-1 dark:text-white">
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!desirable.length && (
                <div>
                  <h3 className="text-base font-semibold mb-1 dark:text-white">
                    Desirable
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {desirable.map((des, idx) => (
                      <li key={idx}>{des}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!benefits.length && (
                <div>
                  <h3 className="text-base font-semibold mb-1 dark:text-white">
                    Benefits
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {benefits.map((ben, idx) => (
                      <li key={idx}>{ben}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-80 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg space-y-6">
            <div>
              <p className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                <CoinsIcon className="w-6 h-6" /> Salary (INR)
              </p>
              <p className="text-green-600 font-semibold text-lg">
                ₹{minSalary.toLocaleString()} - ₹{maxSalary.toLocaleString()}
              </p>
              <p className="text-sm mt-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4" /> {location}
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                Job Overview
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <OverviewItem
                  icon={assets.calendar}
                  label="JOB POSTED"
                  value={
                    postedDate ? new Date(postedDate).toLocaleDateString() : "-"
                  }
                />
                <OverviewItem
                  icon={assets.timer}
                  label="JOB EXPIRE"
                  value={
                    expireDate ? new Date(expireDate).toLocaleDateString() : "-"
                  }
                />
                <OverviewItem
                  icon={assets.stack}
                  label="JOB LEVEL"
                  value={jobLevel || "-"}
                />
                <OverviewItem
                  icon={assets.wallet}
                  label="EXPERIENCE"
                  value={experience || "-"}
                />
                <OverviewItem
                  icon={assets.briefcase}
                  label="EDUCATION"
                  value={education || "-"}
                />
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-2 dark:text-white">
                Share this job:
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={assets.copylink}
                  alt="Copy Link"
                  className="w-28 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                />
                {shareLinks?.facebook && (
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={assets.facebook}
                      alt="Facebook"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>
                )}
                {shareLinks?.linkedin && (
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={assets.linkedin}
                      alt="LinkedIn"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>
                )}
                {shareLinks?.twitter && (
                  <a href={shareLinks.twitter} target="_blank" rel="noreferrer">
                    <img
                      src={assets.twitter}
                      alt="Twitter"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>
                )}
                {shareLinks?.mail && (
                  <a
                    href={
                      shareLinks.mail.startsWith("mailto:")
                        ? shareLinks.mail
                        : `mailto:${shareLinks.mail}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={assets.mail}
                      alt="Mail"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>
                )}
              </div>
            </div>

            <button className="bg-[#0A65CC] hover:bg-blue-700 text-white w-full py-3 rounded-md font-medium flex justify-center items-center gap-2 transition">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const OverviewItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <img src={icon} className="w-5 h-5 mt-1" alt={label} />
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

export default JobDetails;
