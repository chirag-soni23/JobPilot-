import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTopSmooth = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-400 pt-16 pb-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-semibold mb-4">
            <Briefcase className="w-6 h-6" />
            Jobpilot
          </div>
          <p>
            Call now:{" "}
            <span className="text-white font-medium">(+91) 123456789</span>
          </p>
          <p className="mt-2 text-sm">
            6391 Elgin St. Celina, Delaware 10299, New York, United States of
            America
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-1">
              <Link onClick={scrollTopSmooth} className="cursor-pointer" to="/">
                <span>Home</span>
              </Link>
            </li>

            <li className="flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" />
              <Link
                onClick={scrollTopSmooth}
                className="cursor-pointer"
                to="/contact"
              >
                <span>Contact</span>
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <Link
                onClick={scrollTopSmooth}
                className="cursor-pointer"
                to="/findjobs"
              >
                <span>Find Jobs</span>
              </Link>
            </li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Candidate */}
        <div>
          <h4 className="text-white font-semibold mb-4">Candidate</h4>
          <ul className="space-y-2 text-sm">
            <li>Browse Jobs</li>
            <li>Browse Employers</li>
            <li>Candidate Dashboard</li>
            <li>Saved Jobs</li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h4 className="text-white font-semibold mb-4">Employers</h4>
          <ul className="space-y-2 text-sm">
            <li>Post a Job</li>
            <li>Browse Candidates</li>
            <li>Employers Dashboard</li>
            <li>Applications</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Faqs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {currentYear} Jobpilot - Job Portal. All rights Reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Facebook className="w-4 h-4 hover:text-white cursor-pointer" />
          <Youtube className="w-4 h-4 hover:text-white cursor-pointer" />
          <Instagram className="w-4 h-4 hover:text-white cursor-pointer" />
          <Twitter className="w-4 h-4 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
