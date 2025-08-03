import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  SlidersHorizontal,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  BanIcon,
  Trash,
} from "lucide-react";
import Footer from "../components/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { JobData } from "../context/JobContext";
import { UseJobApply } from "../context/JobApplyContext";
import Loading from "../components/Loading";

const getBadgeColor = (type) => {
  switch (type) {
    case "FULL-TIME":
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    case "PART-TIME":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
    case "INTERNSHIP":
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300";
    case "CONTRACT":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
  }
};

const isExpired = (dateStr) => new Date(dateStr).getTime() < Date.now();

const formatSalary = (value) => {
  const salary = Number(value);
  if (isNaN(salary) || salary === 0) return "—";
  if (salary >= 100000) {
    const lpa = salary / 100000;
    return `${Number.isInteger(lpa) ? lpa : lpa.toFixed(1)} LPA`;
  }
  if (salary >= 1000) {
    const k = salary / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)} K`;
  }
  return `₹${salary.toLocaleString()}`;
};

const FindJob = () => {
  const { jobs, deleteJob, loadingSingleJob } = JobData();
  const { isAuth, user } = UserData();
  const { applications } = UseJobApply();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    setKeyword(params.get("keyword") || "");
  }, [search]);

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(keyword.toLowerCase()) &&
      j.location.toLowerCase().includes(city.toLowerCase()) &&
      (type === "" || j.type === type)
  );

  const jobsPerPage = 8;
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const offset = currentPage * jobsPerPage;
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const navigateJobDetails = (id) => navigate(`/jobdetails/${id}`);

  const scrollTopSmooth = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const deleteJobById = (jobId) => {
    if (confirm("Do you really want to delete the job?")) {
      deleteJob(jobId);
    }
  };

  return (
    <>
      <div className="w-full py-6 space-y-10 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Find Job
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Search and explore jobs that match your skills and location.
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
            / <span>Find Job</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap">
          <div className="flex flex-wrap items-start gap-0 w-full lg:w-2/3">
            {/* Keyword Search */}
            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-l-lg flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <Search className="w-5 h-5 text-[#0A65CC]" />
              <input
                type="text"
                placeholder="Search by Job title, Position, Keyword..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setCurrentPage(0);
                }}
                className="outline-none w-full bg-transparent text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* City Filter */}
            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <MapPin className="w-5 h-5 text-[#0A65CC]" />
              <input
                type="text"
                placeholder="City, state or zip code"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCurrentPage(0);
                }}
                className="outline-none w-full bg-transparent text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Job Type Filter */}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(0);
              }}
              className="py-4 px-3 border border-gray-200 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm shadow-sm w-full lg:w-40 mt-2 lg:mt-0"
            >
              <option value="">All Types</option>
              <option value="FULL-TIME">Full Time</option>
              <option value="PART-TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full lg:w-auto justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-600 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() =>
                !isAuth && toast.error("Please login to find jobs")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
            >
              Find Job
            </button>
          </div>
        </div>

        {/* Job Cards Section */}
        {filteredJobs.length === 0 && !loadingSingleJob ? (
          <div className="w-full text-center py-20 text-gray-600 dark:text-gray-300">
            No job found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loadingSingleJob ? (
                <Loading />
              ) : (
                filteredJobs.slice(offset, offset + jobsPerPage).map((job) => {
                  const expired = isExpired(job.expireDate);
                  const applied = applications.some(
                    (app) => app.job?._id?.toString() === job._id?.toString()
                  );

                  return (
                    <div
                      key={job._id}
                      onClick={() => {
                        if (expired) {
                          toast.error("This job listing has expired");
                          return;
                        }
                        navigateJobDetails(job._id);
                      }}
                      className="relative bg-white dark:bg-gray-800 cursor-pointer shadow-md rounded-xl p-4 w-full transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:ring-1 hover:ring-indigo-400 dark:hover:shadow-indigo-700/40 dark:hover:ring-indigo-500/30"
                    >
                      {user?.role === "admin" && (
                        <Trash
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteJobById(job._id);
                          }}
                          className="absolute top-3 right-3 w-4 h-4 text-gray-400 dark:text-red-500 hover:text-red-600"
                        />
                      )}

                      {expired && (
                        <BanIcon
                          className={`absolute top-3 w-4 h-4 text-red-400 dark:text-red-500 ${
                            user.role !== "admin" ? "right-3" : "right-10"
                          }`}
                        />
                      )}

                      {applied && (
                        <span className="absolute bottom-3 right-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">
                          Applied
                        </span>
                      )}

                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeColor(
                          job.type
                        )}`}
                      >
                        {job.type}
                      </span>

                      <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                        {job.title}
                      </h2>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Salary: {formatSalary(job.minSalary)} –{" "}
                        {formatSalary(job.maxSalary)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={job.logoUrl?.url}
                          alt="Company"
                          className="w-6 h-6 rounded"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {job.company}
                        </p>
                      </div>

                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {job.location}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {!loadingSingleJob && pageCount > 1 && (
              <div className="flex justify-center pt-10">
                <ReactPaginate
                  previousLabel={<ChevronLeft className="w-4 h-4" />}
                  nextLabel={<ChevronRight className="w-4 h-4" />}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center gap-3"
                  pageClassName="text-sm text-gray-600 dark:text-gray-300"
                  pageLinkClassName="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  previousClassName="text-blue-500"
                  previousLinkClassName="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  nextClassName="text-blue-500"
                  nextLinkClassName="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  activeLinkClassName="bg-blue-600 text-white font-bold"
                  renderOnZeroPageCount={null}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={1}
                  activeClassName="rounded-full"
                />
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default FindJob;
