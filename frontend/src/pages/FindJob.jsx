import React from "react";
import { SlidersHorizontal, Search } from "lucide-react";

const FindJob = () => {
  return (
    <div className="w-full py-6 space-y-10 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Header Section */}
      <div className="space-y-6 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Find Job</h1>
      </div>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Job Title Input */}
          <div className="flex items-center gap-3 px-4 py-3 border rounded-lg flex-1 bg-white shadow-sm">
          
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Job title, Position, Keyword..."
              className="outline-none w-full text-base placeholder:text-gray-400"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-4 py-3 border rounded-lg flex-1 bg-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 019.9 0c2.73 2.73 2.73 7.17 0 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="City, state or zip code"
              className="outline-none w-full text-base placeholder:text-gray-400"
            />
          </div>

          {/* Filter button */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Find Job button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
            Find Job
          </button>
        </div>

      {/* One Job Card */}
      <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm">
        <span className="text-sm font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
          PART-TIME
        </span>
        <h2 className="text-lg font-semibold mt-2">
          Technical Support Specialist
        </h2>
        <p className="text-sm text-gray-500 mt-1">Salary: $20,000 – $25,000</p>
        <div className="flex items-center gap-2 mt-2">
          <img
            src="https://logo.clearbit.com/google.com"
            alt="Company"
            className="w-6 h-6"
          />
          <p className="text-sm text-gray-600">Google Inc.</p>
        </div>
        <p className="text-xs text-gray-400">Dhaka, Bangladesh</p>
      </div>
    </div>
  );
};

export default FindJob;
