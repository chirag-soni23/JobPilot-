import { Link } from "react-router-dom";
import { JobData } from "../context/JobContext";
import { useEffect } from "react";

const scrollTopSmooth = () => window.scrollTo({ top: 0, behavior: "smooth" });

const ApplyJobHeader = ({ id }) => {
  const { getJobById, singleJob } = JobData();

  useEffect(() => {
    if (id) getJobById(id);
  }, [id, getJobById]);

  return (
    <div className="p-2">
      <div className="bg-white mt-4 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full max-w-3xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {singleJob?.title || "Job Title"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Apply Job For this Role
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
            Find Jobs
          </Link>{" "}
          / <span>Apply Job</span>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobHeader;
