import React from 'react'
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close Dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    // ✅ Event listener add karna
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // ✅ Cleanup: Event listener remove karna
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="flex items-center justify-between h-16">
            <div>
              <i className="text-blue-700 ri-menu-line"></i>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="border-[2px] border-blue-300 rounded-[18px] outline-0 w-64 h-10 text-black px-4"
                placeholder="Search"
              />

              {/* User Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2U747Wh3TKa6TTyZOittQbDSQWwVJXU3_vA&s"
                    alt="User"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-lg w-44">
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">
                        name@flowbite.com
                      </div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* End User Avatar Dropdown */}
            </div>
          </nav>
  )
}
