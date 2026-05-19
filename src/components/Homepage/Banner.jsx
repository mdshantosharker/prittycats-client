"use client";
import Lottie from "lottie-react";
import animationData from "../../assets/cat_full.json";
import Link from "next/link";
import Image from "next/image";

const BannerPage = () => {
  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center justify-center pt-36 py-20 px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-30 -left-20 w-105 h-105 bg-pink-200/40 blur-[140px] rounded-full"></div>

        <div className="absolute -bottom-30 -right-20 w-105 h-105 bg-indigo-200/40 blur-[140px] rounded-full"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-purple-100/30 blur-[120px] rounded-full"></div>
      </div>

      <div className=" w-full mx-auto grid lg:grid-cols-2 justify-between items-center">
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full
            border border-gray-200 bg-white shadow-sm text-sm text-gray-600"
          >
            🐾 Welcome to PrittyCats
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-gray-900">
            Find Your
            <span className="block bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Perfect Cat
            </span>
            Companion
          </h1>

          <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Discover adorable cats waiting for a loving home. Adopt, rescue, and
            make unforgettable memories with your new furry friend.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/all-pets">
              <button
                className="px-8 py-4 rounded-2xl bg-linear-to-r 
                from-pink-500 to-indigo-500 text-white font-semibold
                shadow-lg hover:scale-105 hover:shadow-pink-200 
                transition duration-300"
              >
                Adopt Now 🐱
              </button>
            </Link>

            <Link href="/about">
              <button
                className="px-8 py-4 rounded-2xl bg-white border border-gray-200
                text-gray-700 font-semibold shadow-sm hover:bg-gray-50
                hover:scale-105 transition duration-300"
              >
                Learn More
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-500 text-sm">Cats Adopted</p>
            </div>

            <div className="w-px h-10 bg-gray-200"></div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-500 text-sm">Happy Families</p>
            </div>

            <div className="w-px h-10 bg-gray-200"></div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
              <p className="text-gray-500 text-sm">Support</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute w-125 h-125 rounded-full"></div>

          <div
            className="relative w-full max-w-130 bg-white/80 backdrop-blur-xl
            border border-white shadow-2xl rounded-[40px]
            p-6 md:p-10"
          >
            <div className="w-full max-w-105 mx-auto">
              <Lottie animationData={animationData} loop={true} />
            </div>

            <div
              className="absolute top-6 -left-4 md:-left-8 bg-white shadow-lg
              px-5 py-3 rounded-2xl border border-pink-100"
            >
              <p className="text-sm font-semibold text-gray-700">
                😻 2k+ Cat Lovers
              </p>
            </div>

            <div
              className="absolute bottom-6 -right-4 md:-right-8 bg-white shadow-lg
              px-5 py-3  rounded-2xl border border-indigo-100"
            >
              <p className="text-sm font-semibold text-gray-700">
                🐾 Safe Adoption
              </p>
            </div>

            <div
              className="absolute top-1/2 -left-6 bg-white shadow-xl
              rounded-2xl p-3 border border-gray-100"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
                alt="cat"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPage;
