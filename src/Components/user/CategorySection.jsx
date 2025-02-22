import React, { useRef } from "react";
import { motion } from "framer-motion";

function CategorySection() {
  const scrollRef = useRef(null);

  // Scroll functions with improved precision
  const scrollLeft = () => {
    const slider = scrollRef.current;
    const scrollAmount = slider.clientWidth * 0.8; // 80% of visible width
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = scrollRef.current;
    const scrollAmount = slider.clientWidth * 0.8; // 80% of visible width
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:gap-10 md:p-10 bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-blue-700 md:text-3xl">
          Explore Categories
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Discover our diverse range of topics
        </p>
      </div>

      {/* Scrollable Category Section with Buttons */}
      <div className="relative px-6 md:px-12">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute z-10 p-3 text-white transition-all duration-300 -translate-y-1/2 bg-blue-700 rounded-full shadow-lg -left-2 md:-left-4 top-1/2 md:p-4 hover:bg-blue-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll Left"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`
              /* Hide Scrollbar for Chrome & Safari */
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div className="flex gap-8 py-6 md:gap-12 md:py-10 min-w-max">
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }} // Subtle hover lift
                whileTap={{ scale: 0.95 }} // Tap feedback
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center gap-3 cursor-pointer snap-center"
              >
                <img
                  src="https://placehold.co/180x180"
                  className="w-[140px] md:w-[180px] h-[140px] md:h-[180px] rounded-full object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
                  alt={`Category ${index + 1}`}
                />
                <p className="text-sm md:text-[15px] font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200">
                  Category Name
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute z-10 p-3 text-white transition-all duration-300 -translate-y-1/2 bg-blue-700 rounded-full shadow-lg -right-2 md:-right-4 top-1/2 md:p-4 hover:bg-blue-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll Right"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CategorySection;
