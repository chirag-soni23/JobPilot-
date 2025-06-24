import { Bookmark, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { assets } from "../assets/assets.js";

const JobDetails = () => {
  return (
    <>
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 w-full mx-auto h-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Job Details</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn more about the role and its requirements.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Link className="text-blue-600 hover:underline" to="/">
              Home
            </Link>{" "}
            /{" "}
            <Link className="text-blue-600 hover:underline" to="/findjobs">
              Find Job
            </Link>{" "}
            / Java Developer / jobdetails
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={assets.facebookicon}
                alt="Company"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Senior UX Designer
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  at <span className="text-gray-800 dark:text-white font-medium">Facebook</span>
                </p>
                <div className="flex gap-2 mt-2 text-xs font-medium">
                  <span className="bg-green-100 text-green-600 dark:bg-green-300/20 dark:text-green-400 px-2 py-1 rounded">
                    FULL-TIME
                  </span>
                  <span className="bg-red-100 text-red-600 dark:bg-red-300/20 dark:text-red-400 px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <button className="p-2 cursor-pointer rounded-md">
                  <img src={assets.save} className="w-10 h-10" alt="save-image" />
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="text-base font-semibold mb-1 dark:text-white">Job Description</h3>
                <p>
                  Velstar is a Shopify Plus agency, and we partner with brands to help them grow...
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1 dark:text-white">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Great troubleshooting and analytical skills</li>
                  <li>3+ years of backend development experience</li>
                  <li>HTML, JavaScript, CSS, PHP, Laravel etc.</li>
                  <li>Experience in Agile & API platforms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1 dark:text-white">Desirable</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Knowledge of Shopify, WooCommerce, Magento etc.</li>
                  <li>API platform experience</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1 dark:text-white">Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Early Fridays and flexible hours</li>
                  <li>28 days holiday</li>
                  <li>Generous annual bonus</li>
                  <li>Health care funding</li>
                  <li>Perksbox and new MacBook Pro</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-80 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg space-y-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Salary (USD)</p>
              <p className="text-green-600 font-semibold text-lg">
                $100,000 - $120,000
              </p>
              <p className="text-sm mt-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                Job Overview
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                {/* Job Posted */}
                <div className="flex items-start gap-2">
                  <img src={assets.calendar} className="w-5 h-5 mt-1" alt="calendar" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">JOB POSTED</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      24 Jun, 2021
                    </p>
                  </div>
                </div>

                {/* Job Expire */}
                <div className="flex items-start gap-2">
                  <img src={assets.timer} className="w-5 h-5 mt-1" alt="timer" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">JOB EXPIRE IN</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      14 Aug, 2021
                    </p>
                  </div>
                </div>

                {/* Job Level */}
                <div className="flex items-start gap-2">
                  <img src={assets.stack} className="w-5 h-5 mt-1" alt="stack" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">JOB LEVEL</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Entry Level
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-2">
                  <img src={assets.wallet} className="w-5 h-5 mt-1" alt="wallet" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">EXPERIENCE</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      $50k - 80k/month
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="flex items-start gap-2">
                  <img src={assets.briefcase} className="w-5 h-5 mt-1" alt="briefcase" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">EDUCATION</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Graduation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share */}
            <div>
              <h4 className="text-base font-semibold mb-2 dark:text-white">Share this job:</h4>
              <div className="flex items-center gap-3">
                <img src={assets.copylink} alt="Copy Link" className="w-28 cursor-pointer hover:scale-105 transition-transform" />
                <img src={assets.facebook} alt="Facebook" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
                <img src={assets.linkedin} alt="LinkedIn" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
                <img src={assets.twitter} alt="Twitter" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
                <img src={assets.mail} alt="Twitter" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Apply Now */}
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

export default JobDetails;
