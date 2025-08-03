import { MapPin, BadgeCheck, Search } from "lucide-react";
import { useState } from "react";
import { JobData } from "../context/JobContext.jsx";
import Footer from "../components/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";

const getBadgeColor = (type) => {
  switch (type) {
    case "FULL-TIME":
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    case "PART-TIME":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
    case "INTERNSHIP":
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
  }
};

const formatSalary = (value) => {
  const salary = Number(value);
  if (isNaN(salary)) return "—";
  if (salary >= 100000) return `${(salary / 100000).toFixed(1)} LPA`;
  return `₹${salary.toLocaleString("en-IN")}`;
};

const FeaturedJobsPage = () => {
  const { jobs } = JobData();
  const featuredJobs = jobs.filter((job) => job.isFeatured);

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const filteredJobs = featuredJobs.filter(
    (j) =>
      j.title.toLowerCase().includes(keyword.toLowerCase()) &&
      j.location.toLowerCase().includes(city.toLowerCase()) &&
      (type === "" || j.type === type)
  );

  return (
    <>
      <div className="w-full py-6 space-y-10 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Featured Jobs
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse featured jobs tailored to your profile and preferences.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Link to={"/"} className="text-blue-600">
              Home
            </Link>{" "}
            / <span>Featured Jobs</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap">
          <div className="flex flex-wrap items-start gap-0 w-full lg:w-2/3">
            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-l-lg flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <Search className="w-5 h-5 text-[#0A65CC]" />
              <input
                type="text"
                placeholder="Search by Job title, Position, Keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="outline-none w-full bg-transparent text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <MapPin className="w-5 h-5 text-[#0A65CC]" />
              <input
                type="text"
                placeholder="City, state or zip code"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none w-full bg-transparent text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="py-4 px-3 border border-gray-200 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm shadow-sm w-full lg:w-40 mt-2 lg:mt-0"
            >
              <option value="">All Types</option>
              <option value="FULL-TIME">Full Time</option>
              <option value="PART-TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <section className="pt-10">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No featured jobs found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/job/${job._id}`)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(
                        job.type
                      )}`}
                    >
                      {job.type}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Salary: {formatSalary(job.minSalary)} -{" "}
                      {formatSalary(job.maxSalary)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={job.logoUrl.url}
                      alt={job.company}
                      className="w-8 h-8 object-contain"
                    />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">{job.company}</p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <BadgeCheck
                        className="w-5 h-5 text-blue-500 dark:text-blue-400"
                        title="Featured"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FeaturedJobsPage;
