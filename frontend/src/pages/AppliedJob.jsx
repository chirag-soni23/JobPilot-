import React, { useState, useMemo } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, SlidersHorizontal, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { UseJobApply } from "../context/JobApplyContext";

const AppliedJob = () => {
  const { applications } = UseJobApply();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const jobsPerPage = 8;
  const offset = currentPage * jobsPerPage;

  const appliedJobs = useMemo(() => {
    return applications
      .map((app) => app.job) 
      .filter(
        (job) =>
          job.title.toLowerCase().includes(keyword.toLowerCase()) &&
          job.location.toLowerCase().includes(city.toLowerCase()) &&
          (type === "" || job.type === type)
      );
  }, [applications, keyword, city, type]);

  const displayedJobs = appliedJobs.slice(offset, offset + jobsPerPage);

  const navigateJobDetails = (id) => navigate(`/jobdetails/${id}`);

  return (
    <>
      <div className="w-full py-6 space-y-10 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Top Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-yellow-500" />
              Applied Jobs
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View all jobs you've applied to.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Link className="text-blue-600 hover:underline" to="/">
              Home
            </Link>{" "}
            / <span>Applied Jobs</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap">
          <div className="flex flex-wrap items-start gap-0 w-full lg:w-2/3">
            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-l-lg flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <span className="text-[#0A65CC]">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Job title, Position, Keyword..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setCurrentPage(0);
                }}
                className="outline-none w-full text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-4 border-t border-b border-gray-200 dark:border-gray-700 flex-1 bg-white dark:bg-gray-800 shadow-sm lg:border-t lg:border-b-0">
              <span className="text-[#0A65CC]">
                <MapPin className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="City, state or zip code"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCurrentPage(0);
                }}
                className="outline-none w-full text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(0);
              }}
              className="py-4 px-3 border border-gray-200 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm shadow-sm w-full lg:w-40"
            >
              <option value="">All Types</option>
              <option value="FULL-TIME">Full Time</option>
              <option value="PART-TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div className="flex gap-3 w-full lg:w-auto justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-600 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() =>
                toast("Already viewing applied jobs")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
            >
              Find Job
            </button>
          </div>
        </div>

        {/* Job Cards */}
        {appliedJobs.length === 0 ? (
          <div className="w-full text-center py-20 text-gray-600 dark:text-gray-300">
            No applied jobs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedJobs.map((job) => (
              <div
                onClick={() => navigateJobDetails(job._id)}
                key={job._id}
                className="relative bg-white cursor-pointer dark:bg-gray-800 
                  transition-transform duration-300 ease-in-out 
                  hover:scale-[1.03] hover:shadow-lg hover:ring-1 hover:ring-indigo-400 
                  dark:hover:shadow-indigo-700/40 dark:hover:ring-indigo-500/30
                  shadow-md rounded-xl p-4 w-full"
              >
                <span className="text-sm font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-300/20 dark:text-yellow-400 flex items-center justify-center gap-1 w-fit">
                  {job.type}
                  <Bookmark className="absolute top-3 right-3 w-5 h-5 text-green-500" />
                </span>

                <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                  {job.title}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Salary: ₹{job.minSalary} – ₹{job.maxSalary}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  {job.logoUrl?.url && (
                    <img
                      src={job.logoUrl.url}
                      alt="Company"
                      className="w-6 h-6 rounded"
                    />
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {job.company}
                  </p>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {job.location}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppliedJob;
