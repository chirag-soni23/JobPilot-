import { useState } from "react";
import { Phone, Menu, X, ChartBar, User2Icon } from "lucide-react";
import Header from "./Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logoutUser } = UserData();

  const navLinkClass = (path) =>
    currentPath === path
      ? "text-[#0A65CC] dark:text-white font-medium border-b-2 border-[#0A65CC] pb-1"
      : "text-gray-700 dark:text-gray-300 hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition";

  const handleLogout = () => {
    logoutUser();
    navigate("/signin");
  };

  const UserAvatar = () =>
    user ? (
      user.profile?.url ? (
        <img
          src={user.profile.url}
          alt={user.name}
          title={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div
          title={user.name}
          className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full font-bold text-sm"
        >
          {user.name?.charAt(0)?.toUpperCase()}
        </div>
      )
    ) : (
      <User2Icon className="w-6 h-6 text-white" />
    );

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 md:px-20 py-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="md:hidden flex items-center w-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-800 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
              )}
            </button>

            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <UserAvatar />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/findjobs" className={navLinkClass("/findjobs")}>
              Find Jobs
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-gray-700 dark:text-gray-200 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5" /> +91 9876543210
            </span>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className={`flex gap-2 items-center justify-center dark:text-white ${
                user?.role !== "admin" ? "hidden" : ""
              }`}
              href="https://job-pilot-dashboard.streamlit.app/"
            >
              <ChartBar /> Dashboard
            </a>

            <ThemeToggle />
            <UserAvatar />
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex items-start flex-col gap-4">
            <Link
              to="/"
              className={`${navLinkClass("/")} w-fit`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/findjobs"
              className={`${navLinkClass("/findjobs")} w-fit`}
              onClick={() => setIsOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/contact"
              className={`${navLinkClass("/contact")} w-fit`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className={`flex gap-2 items-center justify-center dark:text-white  ${
                user?.role !== "admin" ? "hidden" : ""
              }`}
              href="https://job-pilot-dashboard.streamlit.app/"
            >
              <ChartBar /> Dashboard
            </a>

            <span className="text-gray-700 dark:text-gray-200 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5" /> +91 9876543210
            </span>

            {/* {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-fit"
              >
                Logout
              </button>
            )} */}
          </div>
        </div>
      </nav>

      <Header />
    </>
  );
};

export default Navbar;
