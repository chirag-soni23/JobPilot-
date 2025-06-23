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

const jobsData = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  type: "PART-TIME",
  title: "Technical Support Specialist",
  salary: "$20,000 – $25,000",
  company: "Google Inc.",
  logo: "https://logo.clearbit.com/google.com",
  location: "Dhaka, Bangladesh",
}));

const FindJob = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 8;
  const pageCount = Math.ceil(jobsData.length / jobsPerPage);

  const offset = currentPage * jobsPerPage;
  const currentJobs = jobsData.slice(offset, offset + jobsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
    <div className="w-full py-6 space-y-10 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Header */}
      <div className="space-y-6 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Find Job</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap">
        <div className="flex flex-wrap items-start gap-0 w-full lg:w-2/3">
          <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 rounded-l-lg flex-1 bg-white shadow-sm">
            <span className="text-[#0A65CC]">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by Job title, Position, Keyword..."
              className="outline-none w-full text-base placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-4 border border-gray-200 rounded-r-lg flex-1 bg-white shadow-sm">
            <span className="text-[#0A65CC]">
              <MapPin className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="City, state or zip code"
              className="outline-none w-full text-base placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full lg:w-auto justify-end">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
            Find Job
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white shadow-md rounded-xl p-4 w-full">
            <span className="text-sm font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
              {job.type}
            </span>
            <h2 className="text-lg font-semibold mt-2">{job.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Salary: {job.salary}</p>
            <div className="flex items-center gap-2 mt-2">
              <img src={job.logo} alt="Company" className="w-6 h-6" />
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <p className="text-xs text-gray-400">{job.location}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-10">
        <ReactPaginate
          previousLabel={<ChevronLeft className="w-4 h-4" />}
          nextLabel={<ChevronRight className="w-4 h-4" />}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex items-center gap-3"
          pageClassName="text-sm text-gray-600"
          pageLinkClassName="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          previousClassName="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-blue-400"
          nextClassName="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-blue-400"
          activeLinkClassName="bg-blue-600 text-white font-bold"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          activeClassName="rounded-full"
          forcePage={currentPage}
        />
      </div>
    </div>
      <Footer/>

    </>
  );
};

export default FindJob;
