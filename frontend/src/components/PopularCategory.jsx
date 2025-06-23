import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import design from "../assets/design.png";
import code from "../assets/code.png";
import marketing from "../assets/marketing.png";
import video from "../assets/video.png";
import music from "../assets/music.png";
import finance from "../assets/finance.png";
import health from "../assets/health.png";
import data from "../assets/data.png";

const categories = [
  { id: 1, title: "Graphics & Design", positions: 357, icon: design },
  { id: 2, title: "Code & Programing", positions: 312, icon: code },
  { id: 3, title: "Digital Marketing", positions: 297, icon: marketing },
  { id: 4, title: "Video & Animation", positions: 247, icon: video },
  { id: 5, title: "Music & Audio", positions: 204, icon: music },
  { id: 6, title: "Account & Finance", positions: 167, icon: finance },
  { id: 7, title: "Health & Care", positions: 125, icon: health },
  { id: 8, title: "Data & Science", positions: 57, icon: data },
];

const PopularCategory = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-14">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Popular category</h2>
        <button className="text-[#0A65CC] text-sm md:text-base flex items-center gap-1 font-medium hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedId(cat.id)}
              className={`cursor-pointer flex items-start gap-4 px-5 py-6 rounded-md transition-all duration-200 ${
                isSelected
                  ? "bg-[#0A65CC] text-white"
                  : "bg-[#F3F6FF] text-gray-800 hover:bg-[#E6EEFF]"
              }`}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h4
                  className={`text-sm font-medium ${
                    isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {cat.title}
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    isSelected ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {cat.positions} Open position
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategory;
