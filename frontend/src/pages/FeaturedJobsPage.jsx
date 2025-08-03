import { MapPin, BadgeCheck } from "lucide-react";
import { JobData } from "../context/JobContext.jsx";
import Footer from "../components/Footer.jsx";

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

  return (
    <>
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-10">
          All Featured Jobs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job._id}
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
      </section>
      <Footer />
    </>
  );
};

export default FeaturedJobsPage;
