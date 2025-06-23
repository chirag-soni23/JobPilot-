import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md px-6 md:px-20 py-4">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to={"/"}
              className="text-[#0A65CC] font-medium border-b-2 border-[#0A65CC] pb-1"
            >
              Home
            </Link>
            <Link
              to={"/findjob"}
              className="text-gray-700 hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition"
            >
              Find Jobs
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition"
            >
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
            <Link
              to={"/"}
              className="text-[#0A65CC] w-fit font-medium border-b-2 border-[#0A65CC] pb-1"
            >
              Home
            </Link>
            <Link
              to={"/findjob"}
              className="text-gray-700 w-fit hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition"
            >
              Find Jobs
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-700 w-fit hover:text-[#0A65CC] font-medium hover:border-b-2 hover:border-[#0A65CC] pb-1 transition"
            >
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
