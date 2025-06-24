import React, { useState } from "react";
import { Search } from "lucide-react";
import { assets } from "../assets/assets";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Hero = () => {
  const { user } = UserData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to search jobs.");
      return;
    }
  };

  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-24 mb-16">
      <div className="max-w-xl w-full">
        <h1 className="font-semibold text-3xl md:text-4xl text-black leading-snug">
          Find a Job that Suits{" "}
          <span className="text-[#0A65CC]">Your Interests and Skills</span>
        </h1>

        <p className="mt-4 text-gray-500 text-sm md:text-base">
          Unlock potential with tailored strategies designed for success.
        </p>

        <form
          className="mt-6 w-full flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm"
          onSubmit={handleSubmit}
        >
          <span className="pl-4 text-[#0A65CC]">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search job, keyword, company"
            className="w-full h-12 md:h-14 px-3 text-sm md:text-base text-gray-700 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#0A65CC] hover:bg-[#084d9b] text-white text-sm md:text-base px-6 md:px-10 py-2 md:py-3 mr-2 rounded-md cursor-pointer transition"
          >
            Search
          </button>
        </form>
      </div>

      <img
        className="w-48 md:w-80 scale-x-[-1] max-md:mt-10"
        src={assets.hero}
        alt="hero"
      />
    </main>
  );
};

export default Hero;
