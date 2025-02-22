import React from "react";

function PostOfTheDay() {
  return (
    <div className="bg-[#a3a7dc1d] w-screen flex justify-center py-10 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 text-white rounded-lg w-full max-w-[90%] md:max-w-[80%] lg:max-w-[75%]">
        {/* Left Side Content */}
        <div className="flex flex-col gap-3 w-full md:w-[50%] text-center md:text-left">
          <p className="bg-[#a3a7dc28] w-fit text-blue-700 px-4 md:px-5 py-1.5 hover:bg-[#a3a7dc5f] transition-all duration-200 cursor-pointer rounded font-bold mx-auto md:mx-0">
            Blog Of the Day
          </p>
          <div>
            <h2 className="text-3xl sm:text-[40px] md:text-[55px] lg:text-[70px] font-extrabold text-black">
              Tasty Fluffy Pancakes
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-10 mt-2 [&>div>i]:text-lg md:[&>div>i]:text-[22px] [&>div>p]:text-black [&>div>p]:font-semibold [&>div>i]:text-blue-700">
            <div className="flex items-center justify-center space-x-2 md:justify-start">
              <i className="ri-user-line"></i>
              <p>Author Name</p>
            </div>
            <div className="flex items-center justify-center space-x-2 md:justify-start">
              <i className="ri-folder-line"></i>
              <p>Category</p>
            </div>
          </div>

          <p className="w-full mt-4 text-sm text-justify text-black md:text-base line-clamp-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
            officia nostrum eaque velit quas sit dolorum! Ipsa quidem odit
            corporis.
          </p>
          <a
            href=""
            className="px-4 py-2 mx-auto mt-4 transition-all duration-200 bg-blue-800 rounded-md md:px-5 w-fit hover:bg-blue-700 md:mx-0 md:mt-0"
          >
            Read More
          </a>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-[50%] mt-6 md:mt-0 flex justify-center">
          <img
            src="https://placehold.co/400x400"
            className="w-[80%] max-w-[400px] rounded-3xl"
            alt="Pancakes"
          />
        </div>
      </div>
    </div>
  );
}

export default PostOfTheDay;
