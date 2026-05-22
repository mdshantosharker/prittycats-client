"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/404page.json";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6">
      <div className="w-87.5 md:w-125">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1 className="text-white text-3xl md:text-4xl font-bold mt-6">
        Page Not Found
      </h1>

      <p className="text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
