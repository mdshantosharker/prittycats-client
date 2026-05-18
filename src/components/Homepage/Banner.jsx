import React from "react";
import Link from "next/link";

const BannerPage = () => {
  return (
    <section className="relative mt-36 min-h-[85vh] flex items-center justify-center px-6 bg-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-175 h-175 bg-indigo-200/40 blur-[160px] rounded-full"></div>
        <div className="absolute -bottom-45 -right-30 w-125 h-125 bg-pink-200/30 blur-[160px] rounded-full"></div>
      </div>

      <div className="text-center max-w-3xl">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
        bg-gray-50 border border-gray-200 text-gray-600 text-xs mb-6 shadow-sm"
        >
          🐱 Cat Adoption Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Find Your Perfect <br />
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Furry Companion
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          Adopt loving cats from verified shelters. Give them a forever home and
          bring happiness into your life while saving a precious soul.
        </p>

        <div className="flex justify-center my-10">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-indigo-300/30 rounded-full animate-pulse"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
              alt="cat"
              className="w-40 md:w-52 relative hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/all-pets">
            <button
              className="px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600
             text-white font-semibold shadow-md hover:scale-105 transition duration-300"
            >
              Adopt a Cat 🐾
            </button>
          </Link>

          <Link href="/about">
            <button
              className="px-8 py-3 rounded-full bg-white
             text-gray-700 border border-gray-200 hover:bg-gray-50 transition shadow-sm"
            >
              Learn More
            </button>
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          💜 Trusted by animal lovers • Every adoption matters
        </p>
      </div>
    </section>
  );
};

export default BannerPage;
