import React from "react";
import { Bookmark, MapPin, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets.js";

const jobs = [
  {
    id: 1,
    title: "Technical Support Specialist",
    type: "PART-TIME",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    title: "Senior UX Designer",
    type: "FULL-TIME",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 3,
    title: "Marketing Officer",
    type: "INTERNSHIP",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 4,
    title: "Junior Graphic Designer",
    type: "INTERNSHIP",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 5,
    title: "Project Manager",
    type: "FULL-TIME",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 6,
    title: "Front End Developer",
    type: "PART-TIME",
    salary: "$20,000 - $25,000",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
  },
];

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

const FeaturedJobs = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-14">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Featured job
        </h2>
        <button className="text-[#0A65CC] text-sm md:text-base flex items-center gap-1 font-medium hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md transition"
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
                Salary: {job.salary}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={assets.google}
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
                <Bookmark className="w-4 h-4 text-gray-400 dark:text-gray-300 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
