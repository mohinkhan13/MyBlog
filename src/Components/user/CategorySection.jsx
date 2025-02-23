import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

function CategorySection() {
  const scrollRef = useRef(null);
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories/");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setAllCategory(data.slice(0, 10)); // Limit to 10 categories to reduce initial load
      } catch (err) {
        setError(err.message || "Error fetching categories");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Memoize the category list to prevent re-renders
  const categoryList = useMemo(() => {
    return allCategory.map((cat, index) => (
      <motion.div
        key={cat.id || index}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 cursor-pointer snap-center"
      >
        <img
          src={cat.image || "/placeholder.jpg"}
          className="w-[140px] md:w-[180px] h-[140px] md:h-[180px] rounded-full object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
          alt={cat.name || `Category ${index + 1}`}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
          loading="lazy" // Lazy load images
        />
        <p className="text-sm md:text-[15px] font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200">
          {cat.name}
        </p>
      </motion.div>
    ));
  }, [allCategory]);

  return (
    <div className="flex flex-col gap-8 p-4 md:gap-10 md:p-10 bg-gray-50">
      {/* Title */}
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
          className="absolute z-10 p-3 text-white transition-all duration-300 -translate-y-1/2 bg-blue-700 rounded-full shadow-lg -left-2 md:-left-4 top-1/2 md:p-4 hover:bg-blue-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          aria-label="Scroll Left"
          disabled={isLoading || allCategory.length === 0}
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
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-blue-700 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <p className="py-10 text-center text-red-600">{error}</p>
          ) : allCategory.length === 0 ? (
            <p className="py-10 text-center text-gray-600">
              No categories available
            </p>
          ) : (
            <div className="flex gap-8 py-6 md:gap-12 md:py-10 min-w-max">
              {categoryList}
            </div>
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute z-10 p-3 text-white transition-all duration-300 -translate-y-1/2 bg-blue-700 rounded-full shadow-lg -right-2 md:-right-4 top-1/2 md:p-4 hover:bg-blue-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          aria-label="Scroll Right"
          disabled={isLoading || allCategory.length === 0}
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
