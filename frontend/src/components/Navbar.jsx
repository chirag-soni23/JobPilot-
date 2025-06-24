import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
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

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 md:px-20 py-4 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/findjob" className={navLinkClass("/findjob")}>
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

            <ThemeToggle />

            {user ? (
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
              <Link
                to="/signin"
                className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-800 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            <Link to="/" className={`${navLinkClass("/")} w-fit`}>
              Home
            </Link>
            <Link to="/findjob" className={`${navLinkClass("/findjob")} w-fit`}>
              Find Jobs
            </Link>
            <Link to="/contact" className={`${navLinkClass("/contact")} w-fit`}>
              Contact
            </Link>

            <span className="text-gray-700 dark:text-gray-200 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5" /> +91 9876543210
            </span>

            {user ? (
              <div className="flex items-center gap-4">
                {user.profile?.url ? (
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
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>

      <Header />
    </>
  );
};

export default Navbar;
