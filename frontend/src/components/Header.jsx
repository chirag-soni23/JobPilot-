import { BriefcaseIcon, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logout } = UserData();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleRestrictedRoute = (e, path) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login to continue.");
      return;
    }

    if (path === "/postjob" && user.role !== "admin") {
      e.preventDefault();
      toast.error("Only admins can post jobs.");
      return;
    }

    navigate(path);
  };

  return (
    <header className="bg-[#f9f9f9] dark:bg-gray-800 px-4 md:px-20 py-4 transition-colors duration-300">
      <div className="flex flex-col gap-6 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left : Logo + Search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-1">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-[#0A65CC] dark:text-white flex items-center gap-2 justify-center lg:justify-start"
          >
            <BriefcaseIcon className="w-6 h-6" />
            JobPilot
          </Link>

          {/* Search + Country */}
          <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A65CC]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Job title, keyword, company"
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-[#0A65CC] bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            <select className="w-full sm:w-40 py-2 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-[#0A65CC] bg-white dark:bg-gray-800 text-black dark:text-white">
              <option value="in">🇮🇳 India</option>
              <option value="us">🇺🇸 USA</option>
            </select>
          </div>
        </div>

        {/* Right : Buttons */}
        <div className="flex flex-wrap justify-center gap-3 lg:flex-nowrap">
          {token ? (
            <button
              onClick={handleLogout}
              className="border-2 border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 transition whitespace-nowrap"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="border-2 border-[#0A65CC] text-[#0A65CC] hover:text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition whitespace-nowrap"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={(e) => handleRestrictedRoute(e, "/postjob")}
            className={`bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition whitespace-nowrap ${user?.role !== "admin" ? "hidden":""}`}
          >
            Post a Job
          </button>

          <button
            onClick={(e) => handleRestrictedRoute(e, "/appliedjob")}
            className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition whitespace-nowrap"
          >
            Applied Job
          </button>

          <button
            onClick={(e) => handleRestrictedRoute(e, "/savedjob")}
            className={`bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition whitespace-nowrap ${!user ? "hidden":""}`}
          >
            Saved Job
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
