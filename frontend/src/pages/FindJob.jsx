import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  SlidersHorizontal,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { JobData } from "../context/JobContext";

const FindJob = () => {
  const { jobs } = JobData();
  const { isAuth } = UserData();

  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 8;
  const pageCount = Math.ceil(jobs.length / jobsPerPage);
  const offset = currentPage * jobsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFindJobClick = () => {
    if (!isAuth) {
      toast.error("Please login to find jobs");
      return;
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
            <Link className="text-blue-600 hover:underline" to="/">
              Home
            </Link>{" "}
            / <span>Find Job</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap">
          <div className="flex flex-wrap items-start gap-0 w-full lg:w-2/3">
            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-l-lg flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <span className="text-[#0A65CC]">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search by Job title, Position, Keyword..."
                className="outline-none w-full text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-r-lg flex-1 bg-white dark:bg-gray-800 shadow-sm">
              <span className="text-[#0A65CC]">
                <MapPin className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="City, state or zip code"
                className="outline-none w-full text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-600 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={handleFindJobClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
            >
              Find Job
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.slice(offset, offset + jobsPerPage).map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 w-full"
            >
              <span className="text-sm font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-300/20 dark:text-yellow-400">
                {job.type}
              </span>
              <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Salary: ₹{job.minSalary} – ₹{job.maxSalary}
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
          ))}
        </div>

        {/* Pagination */}
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
      </div>
      <Footer />
    </>
  );
};

export default FindJob;
