import React from "react";

const Contact = () => {
  return (
    <div className="w-full px-4 mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Contact"
            className="w-full h-[300px] sm:h-[400px] md:h-[550px] object-cover rounded-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center w-full gap-5 p-6 bg-white shadow-lg md:w-1/2 sm:p-8 md:p-10 rounded-2xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Get In Touch</h1>
          <div className="flex flex-col w-full gap-4">
            <input
              className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              name="name"
              placeholder="Name *"
            />
            <input
              className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="email"
              name="email"
              placeholder="Email *"
            />
            <input
              className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              name="subject"
              placeholder="Subject"
            />
            <textarea
              className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="message"
              cols="30"
              rows="6"
              placeholder="Message *"
            ></textarea>
          </div>
          <button className="w-full px-4 py-2 font-bold text-white transition-colors bg-blue-500 rounded sm:w-auto hover:bg-blue-600">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
