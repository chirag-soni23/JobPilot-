import { BriefcaseIcon, User, CalendarDays, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logout } = UserData();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => logout();

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

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="bg-[#f9f9f9] dark:bg-gray-800 px-4 md:px-20 py-6 transition-colors duration-300">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left section: Logo + Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 lg:flex-1">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-[#0A65CC] dark:text-white flex items-center gap-2"
          >
            <BriefcaseIcon className="w-6 h-6" />
            JobPilot
          </Link>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 lg:mt-0">
            {user && (
              <div className="flex items-center text-base text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5 mr-2 text-[#0A65CC]" />
                Welcome,&nbsp;
                <span className="font-semibold text-[#0A65CC]">
                  {user.name}
                </span>
                <span className="ml-2 px-2 py-[2px] bg-[#E0F0FF] dark:bg-gray-700 text-[#0A65CC] dark:text-white rounded text-sm">
                  {user.role === "admin" ? "Admin" : "Candidate"}
                </span>
              </div>
            )}

            <div className="flex items-center text-base text-gray-500 dark:text-gray-400">
              <CalendarDays className="w-5 h-5 mr-2 text-[#0A65CC]" />
              {currentDate}
            </div>

            <div className="flex items-center text-base text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 mr-2 text-[#0A65CC]" />
              <span>
                <strong className="text-[#0A65CC]">1,200+</strong> jobs this
                week
              </span>
            </div>
          </div>
        </div>

        {/* Right section: Buttons */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
          {token ? (
            <button
              onClick={handleLogout}
              className="border-2 border-red-400 text-red-400 hover:text-white px-5 py-2 rounded-md hover:bg-red-400 transition text-base"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="border-2 border-[#0A65CC] text-[#0A65CC] hover:text-white px-5 py-2 rounded-md hover:bg-[#084d9b] transition text-base"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={(e) => handleRestrictedRoute(e, "/postjob")}
            className={`bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base ${
              user?.role !== "admin" ? "hidden" : ""
            }`}
          >
            Post a Job
          </button>

          <button
            onClick={(e) => handleRestrictedRoute(e, "/appliedjob")}
            className="bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
          >
            Applied Job
          </button>

          <button
            onClick={(e) => handleRestrictedRoute(e, "/savedjob")}
            className={`bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base ${
              !user ? "hidden" : ""
            }`}
          >
            Saved Job
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
