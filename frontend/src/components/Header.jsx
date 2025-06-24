import { BriefcaseIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Header = () => {
  const { user, logout } = UserData();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#f9f9f9] dark:bg-gray-800 px-6 md:px-20 py-4 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center gap-4">
          <h1 className="text-xl font-semibold text-[#0A65CC] dark:text-white whitespace-nowrap flex items-center gap-2 justify-center">
            <BriefcaseIcon className="w-6 h-6" /> JobPilot
          </h1>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A65CC]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Job title, keyword, company"
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-[#0A65CC] bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            <select className="w-full md:w-[140px] py-2 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-[#0A65CC] bg-white dark:bg-gray-800 text-black dark:text-white">
              <option value="in">🇮🇳 India</option>
              <option value="us">🇺🇸 USA</option>
            </select>
          </div>
        </div>

        {/* Right side: Sign in / Logout + Post Job */}
        <div className="w-full md:w-auto flex justify-center items-center gap-3 text-sm">
          {user ? (
            <button
              onClick={handleLogout}
              className="border-2 border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 cursor-pointer transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/signin"}
              className="border-2 cursor-pointer border-[#0A65CC] text-[#0A65CC] hover:text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition"
            >
              Sign In
            </Link>
          )}
          <Link
            to={"/postjob"}
            className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
