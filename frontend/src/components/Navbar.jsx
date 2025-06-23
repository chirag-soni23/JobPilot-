import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinkClass = (path) =>
    currentPath === path
      ? "text-[#0A65CC] font-medium border-b-2 border-[#0A65CC] pb-1"
      : "text-gray-700 hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition";

  return (
    <>
      <nav className="bg-white shadow-md px-6 md:px-20 py-4">
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
            <span className="text-gray-700 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5" /> +91 9876543210
            </span>
            <button className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition">
              Sign In
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

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
            <span className="text-gray-700 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5" /> +91 9876543210
            </span>
            <button className="bg-[#0A65CC] text-white px-4 py-2 rounded-md hover:bg-[#084d9b] transition">
              Sign In
            </button>
          </div>
        )}
      </nav>

      <Header />
    </>
  );
};

export default Navbar;
