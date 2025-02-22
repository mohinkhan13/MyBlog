import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State
  const navRef = React.useRef(null);

  // Calculate Navbar Height (to prevent content shift)
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  // Scroll Effect for Smooth Sticky Navbar & Background Transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > navHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navHeight]);

  return (
    <>
      <div className="px-30">
        <header className="flex items-center justify-between py-5 transition-all duration-300 border-b border-gray-100">
          <i className="text-xl cursor-pointer ri-search-line"></i>
          <div className="flex items-center space-x-2">
            <i className="ri-dashboard-line text-[32px] text-blue-800"></i>
            <p className="text-[28px] md:text-[32px] font-extrabold">
              BlogVerse
            </p>
          </div>

          {/* 🔹 Hamburger Icon (Visible on Small Screens) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl cursor-pointer md:hidden"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          <i className="hidden text-xl cursor-pointer md:block ri-user-line"></i>
        </header>

        {/* Spacer for Sticky Navbar */}
        <div style={{ height: isSticky ? `${navHeight}px` : "auto" }}></div>

        {/* 🔹 Navbar (Smooth Sticky with Background Transition) */}
        <nav
          ref={navRef}
          className={`w-full text-white py-4 ${
            isSticky
              ? "fixed top-0 left-0 z-50 shadow-lg bg-indigo-900 px-30"
              : "relative bg-white"
          }`}
        >
          <div
            className={`flex items-center justify-between mx-auto ${
              isSticky ? "text-white" : "text-black"
            }`}
          >
            {/* Social Icons */}
            <div className="flex gap-4 [&>i]:text-[20px]">
              <i className="ri-facebook-circle-fill hover:text-blue-600"></i>
              <i className="ri-instagram-fill hover:text-red-600"></i>
              <i className="ri-twitter-x-line hover:text-blue-700"></i>
            </div>

            {/* 🔹 Navigation Links (Hidden on Mobile, Visible on Desktop) */}
            <div className="hidden space-x-6 md:flex">
              <Link to="/" className="font-semibold hover:text-blue-800">
                Home
              </Link>
              <Link to="/post" className="font-semibold hover:text-blue-800">
                Posts
              </Link>
              <Link to="/contact" className="font-semibold hover:text-blue-800">
                Contact
              </Link>
            </div>

            {/* Subscribe Button */}
            <button
              className={`p-2 rounded transition-all duration-300 ${
                isSticky ? "bg-white text-black" : "bg-blue-800 text-white"
              }`}
            >
              Subscribe
            </button>
          </div>

          {/* 🔹 Mobile Menu (Visible only when isMenuOpen is true) */}
          {isMenuOpen && (
            <div className="flex flex-col items-center mt-4 space-y-4 md:hidden">
              <Link
                to="/"
                className="font-semibold text-black hover:text-blue-800"
              >
                Home
              </Link>
              <Link
                to="/post"
                className="font-semibold text-black hover:text-blue-800"
              >
                Posts
              </Link>
              <Link
                to="/contact"
                className="font-semibold text-black hover:text-blue-800"
              >
                Contact
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
