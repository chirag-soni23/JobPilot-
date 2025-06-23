import React from "react";
import {
  Bookmark,
  ArrowRight,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

import companyLogo from "../assets/facebook.png";
import copylink from "../assets/copylink.png";
import facebook from "../assets/facebookicon.png";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";
import Footer from "../components/Footer";

const JobDetails = () => {
  return (
    <>
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 w-full mx-auto h-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Job Details</h1>
            <p className="text-sm text-gray-500">
               Learn more about the role and its requirements.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <Link className="text-blue-600 hover:underline" to="/">
              Home
            </Link>{" "}
            / <Link className="text-blue-600 hover:underline" to={"/findjobs"}>Find Job</Link> / Java Developer / jobdetails
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel - Job Description */}
          <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
            {/* Job Header */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={companyLogo}
                alt="Company"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">Senior UX Designer</h2>
                <p className="text-sm text-gray-500">
                  at{" "}
                  <span className="text-gray-800 font-medium">Facebook</span>
                </p>
                <div className="flex gap-2 mt-2 text-xs font-medium">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                    FULL-TIME
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <button className="border p-2 rounded-md hover:bg-gray-100">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description Sections */}
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="text-base font-semibold mb-1">Job Description</h3>
                <p>
                  Velstar is a Shopify Plus agency, and we partner with brands to
                  help them grow...
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Great troubleshooting and analytical skills</li>
                  <li>3+ years of backend development experience</li>
                  <li>HTML, JavaScript, CSS, PHP, Laravel etc.</li>
                  <li>Experience in Agile & API platforms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1">Desirable</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Knowledge of Shopify, WooCommerce, Magento etc.</li>
                  <li>API platform experience</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1">Benefits</h3>
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

          {/* Right Panel - Sidebar */}
          <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-lg space-y-6">
            {/* Salary + Location */}
            <div>
              <p className="text-sm text-gray-500">Salary (USD)</p>
              <p className="text-green-600 font-semibold text-lg">
                $100,000 - $120,000
              </p>
              <p className="text-sm mt-2 flex items-center gap-1 text-gray-700">
                <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
              </p>
            </div>

            {/* Job Overview */}
            <div>
              <h4 className="text-base font-semibold text-gray-800 mb-2">
                Job Overview
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> <span>14 Jun, 2021</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> <span>14 Aug, 2021</span>
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Entry Level
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> $50k-80k/month
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Graduation
                </p>
              </div>
            </div>

            {/* Share Job */}
            <div>
              <h4 className="text-base font-semibold mb-2">Share this job:</h4>
              <div className="flex items-center gap-3">
                <img
                  src={copylink}
                  alt="Copy Link"
                  className="w-28 cursor-pointer hover:scale-105 transition-transform"
                />
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
              </div>
            </div>

            {/* Apply Button */}
            <button className="bg-[#0A65CC] hover:bg-blue-700 text-white w-full py-3 rounded-md font-medium flex justify-center items-center gap-2 transition">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default JobDetails;
