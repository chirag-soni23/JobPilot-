import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Menu,
  X,
  ChartBar,
  User2Icon,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import { UserData } from "../context/UserContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);
  const fileRef = useRef(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const { user, uploadProfile, deleteProfile, btnLoading } = UserData();

  const navLinkClass = (path) =>
    currentPath === path
      ? "text-[#0A65CC] dark:text-white font-medium border-b-2 border-[#0A65CC] pb-1"
      : "text-gray-700 dark:text-gray-300 hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShowOptions(false);
      uploadProfile(file);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  const UserAvatar = () =>
    user ? (
      <button
        ref={avatarBtnRef}
        onClick={() => setShowOptions((prev) => !prev)}
        className="flex items-center gap-1"
      >
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
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
    ) : (
      <User2Icon className="w-6 h-6 text-white" />
    );

  return (
    <>
      {btnLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      <nav className="bg-white right-0 top-0 left-0 dark:bg-gray-900 shadow-md px-6 md:px-20 py-4 transition-colors duration-300 sticky z-10">
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
              <Phone className="w-5 h-5" /> +91&nbsp;9876543210
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

        {/* Mobile menu */}
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
              <Phone className="w-5 h-5" /> +91&nbsp;9876543210
            </span>
          </div>
        </div>

        {/* Avatar dropdown */}
        {showOptions && user && (
          <div
            ref={dropdownRef}
            className="absolute top-16 right-6 md:right-20 bg-white dark:bg-gray-800 shadow-lg rounded-md w-48 z-50 py-2 dark:text-white"
          >
            <button
              onClick={() => fileRef.current.click()}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={btnLoading}
            >
              Update Profile
            </button>
            <button
              onClick={() => {
                setShowOptions(false);
                deleteProfile();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={btnLoading}
            >
              Delete Profile
            </button>
          </div>
        )}

        {/* hidden file input */}
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </nav>

      <Header />
    </>
  );
};

export default Navbar;
