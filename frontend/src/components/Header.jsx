import { BriefcaseIcon, User, CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logout } = UserData();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
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
    setOpen(false);
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="bg-[#f9f9f9] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#0A65CC] dark:text-white"
        >
          <BriefcaseIcon className="w-6 h-6" />
          JobPilot
        </Link>

        <div className="hidden lg:flex lg:flex-1 lg:justify-center gap-8">
          {user && (
            <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
              <User className="w-5 h-5 text-[#0A65CC]" />
              Welcome,
              <span className="font-semibold text-[#0A65CC]">{user.name}</span>
              <span className="ml-2 px-2 py-[2px] bg-[#E0F0FF] dark:bg-gray-700 text-[#0A65CC] dark:text-white rounded text-sm">
                {user.role === "admin" ? "Admin" : "Candidate"}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-5 h-5 text-[#0A65CC]" />
            {currentDate}
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
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

          {user?.role === "admin" && (
            <button
              onClick={(e) => handleRestrictedRoute(e, "/postjob")}
              className="bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
            >
              Post a Job
            </button>
          )}

          <button
            onClick={(e) => handleRestrictedRoute(e, "/appliedjob")}
            className="bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
          >
            Applied Job
          </button>

          {!!user && (
            <button
              onClick={(e) => handleRestrictedRoute(e, "/savedjob")}
              className="bg-[#0A65CC] text-white px-5 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
            >
              Saved Job
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-[#0A65CC] dark:text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-6 space-y-5">
          <div className="space-y-3 pl-1">
            {user && (
              <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5 text-[#0A65CC]" />
                Welcome,
                <span className="font-semibold text-[#0A65CC]">
                  {user.name}
                </span>
                <span className="ml-2 px-2 py-[2px] bg-[#E0F0FF] dark:bg-gray-700 text-[#0A65CC] dark:text-white rounded text-sm">
                  {user.role === "admin" ? "Admin" : "Candidate"}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400">
              <CalendarDays className="w-5 h-5 text-[#0A65CC]" />
              {currentDate}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 pl-1">
            {token ? (
              <button
                onClick={handleLogout}
                className="border-2 border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 transition text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="border-2 border-[#0A65CC] text-[#0A65CC] hover:text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition text-base"
              >
                Sign In
              </Link>
            )}

            {user?.role === "admin" && (
              <button
                onClick={(e) => handleRestrictedRoute(e, "/postjob")}
                className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
              >
                Post a Job
              </button>
            )}

            <button
              onClick={(e) => handleRestrictedRoute(e, "/appliedjob")}
              className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
            >
              Applied Job
            </button>

            {!!user && (
              <button
                onClick={(e) => handleRestrictedRoute(e, "/savedjob")}
                className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9bcf] transition text-base"
              >
                Saved Job
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
