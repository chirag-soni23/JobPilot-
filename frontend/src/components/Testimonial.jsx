import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { assets } from "../assets/assets.js";

const testimonials = [
  {
    id: 1,
    name: "Robert Fox",
    role: "UI/UX Designer",
    text: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
    image: assets.user1,
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Creative Director",
    text: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante.",
    image: assets.user2,
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Photographer",
    text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.",
    image: assets.user3,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#f8f9fb] dark:bg-gray-900 px-6 md:px-20 py-16 text-center relative">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-900 dark:text-white">
        Clients Testimonial
      </h2>

      {/* Slider Content */}
      <div className="flex justify-center items-center gap-6 overflow-hidden">
        {testimonials.slice(index, index + 3).map((t, i) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm max-w-sm w-full text-left relative"
          >
            {/* Stars */}
            <div className="flex mb-3 text-yellow-500">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
              “{t.text}”
            </p>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.role}
                </p>
              </div>
              <Quote className="ml-auto text-gray-200 dark:text-gray-600 w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-full p-2"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-full p-2"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index
                ? "bg-[#0A65CC]"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
