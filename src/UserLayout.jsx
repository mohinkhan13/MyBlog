import React from "react";
import Navbar from "./Components/user/Navbar";
import Footer from "./Components/user/Footer";
import Sidebar from "./Components/user/Sidebar";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content with Sidebar */}
      <div className="flex flex-col flex-grow w-full gap-6  md:flex-row  border-t-2 border-[#fff8f5]">
        {/* <main className="order-2 w-full md:w-2/3 md:order-1"> */}
        <main className="w-full ">
          <Outlet />
        </main>

        {/* Sidebar */}
        {/* <Sidebar className="order-1 w-full md:w-1/3 md:order-2" /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout;
