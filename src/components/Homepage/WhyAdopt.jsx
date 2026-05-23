import React from "react";
import { FaHeart, FaHome, FaShieldAlt } from "react-icons/fa";

const WhyAdopt = () => {
  return (
    <section className="mt-20 px-6 py-16 dark:bg-black">
      <div className="text-center mb-14 ">
        <h2 className="text-4xl dark:text-white  md:text-5xl font-extrabold text-gray-900">
          Why Adopt Pets? 💛
        </h2>
        <p className="text-gray-500  mt-3">
          Small act of kindness, big change in their life
        </p>
      </div>

      <div className="max-w-7xl  mx-auto grid md:grid-cols-3 gap-10">
        <div className="group dark:bg-gray-800 dark:border-gray-700  dark:text-white p-10 bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 text-center">
          <FaHeart className="text-pink-500 text-5xl mx-auto group-hover:scale-110 transition" />
          <h3 className="mt-6 dark:text-white  font-bold text-2xl text-gray-900">
            Save a Life
          </h3>
          <p className="mt-2 dark:text-white  text-gray-500 text-sm">
            Give a homeless pet a second chance at happiness.
          </p>
        </div>

        <div className="group p-10 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 text-center">
          <FaHome className="text-indigo-500 text-5xl mx-auto group-hover:scale-110 transition" />
          <h3 className="mt-6 font-bold dark:text-white text-2xl text-gray-900">
            Find Love
          </h3>
          <p className="mt-2 dark:text-white  text-gray-500 text-sm">
            Pets bring warmth, love, and joy into your home.
          </p>
        </div>

        <div className="group dark:bg-gray-800 dark:border-gray-700 p-10 bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 text-center">
          <FaShieldAlt className="text-green-500 text-5xl mx-auto group-hover:scale-110 transition" />
          <h3 className="mt-6 font-bold dark:text-white  text-2xl text-gray-900">
            Safe & Healthy
          </h3>
          <p className="mt-2 dark:text-white  text-gray-500 text-sm">
            All pets are vaccinated and health-checked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
