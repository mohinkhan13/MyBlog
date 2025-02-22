import React from "react";

function PopularPost() {
  return (
    <div className="flex flex-col gap-10 px-4 py-8 md:py-10 md:px-30 bg-gray-50">
      <div>
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          Popular Post
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:justify-between md:gap-10">
        <div className="w-full max-w-[400px]">
          <div>
            <img
              src="https://placehold.co/400x400"
              alt="Post thumbnail"
              className="object-cover w-full bg-center bg-cover rounded-t-2xl max-h-[300px]"
            />
          </div>
          <div className="flex flex-col gap-5 px-6 py-6 bg-white shadow md:px-8">
            <p className="bg-[#a3a7dc28] w-fit text-blue-700 px-2 py-1 hover:bg-[#a3a7dc5f] transition-all duration-200 cursor-pointer rounded font-bold mx-auto md:mx-0">
              Category
            </p>
            <a
              href="#"
              className="text-xl font-bold transition-all duration-200 md:text-2xl line-clamp-2 hover:text-blue-700"
            >
              Post Title Here 2 line title here are tou ready
            </a>
            <div className="flex flex-col justify-start gap-4 text-sm md:flex-row md:gap-10 md:text-base">
              <div className="flex items-center space-x-2">
                <i className="ri-user-line"></i>
                <p>Mohinkhan</p>
              </div>
              <p>April 5, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularPost;
