import React from "react";

function NewsletterUpdate() {
  return (
    <div className="flex items-center justify-center bg-white py-8 md:py-30 min-h-[50vh]">
      <div className="flex flex-col items-center justify-center bg-white w-full md:w-[70%] mx-4 py-8 md:py-30 shadow-2xl rounded-2xl gap-7">
        <h1 className="px-4 text-2xl font-extrabold text-center md:text-4xl">
          Newsletter Updates
        </h1>
        <p className="px-4 text-sm text-center text-gray-500 md:text-base">
          Enter your email address below to subscribe to our tasty newsletter
        </p>
        <div className="flex items-center justify-center md:min-w-[60%] gap-2 px-4 mt-8">
          <input
            className="w-full px-5 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <button className="px-5 py-3 font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsletterUpdate;
