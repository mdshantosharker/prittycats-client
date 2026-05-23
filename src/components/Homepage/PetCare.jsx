import React from "react";
import { FaBowlFood, FaShower, FaKitMedical } from "react-icons/fa6";

const PetCareTips = () => {
  return (
    <section className="pt-20 py-16 dark:bg-black">
      <div className="text-center mb-16">
        <h2 className="text-4xl dark:text-white md:text-5xl font-extrabold text-gray-900">
          Pet Care Tips 🐾
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Simple habits for a happy, healthy pet life
        </p>
      </div>

      <div className="lg:max-w-7xl w-11/12 mx-auto grid md:grid-cols-3 gap-10">
        <div className="group dark:bg-gray-800 dark:border-gray-700  bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-md hover:shadow-2xl transition duration-300">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-orange-100 group-hover:scale-110 transition">
            <FaBowlFood className="text-orange-500 text-3xl" />
          </div>

          <h3 className="mt-6 text-2xl dark:text-white font-bold text-gray-900">
            Healthy Food
          </h3>

          <p className="mt-3 text-gray-500 dark:text-white text-sm leading-relaxed">
            Provide balanced nutrition with fresh and quality food every day.
          </p>
        </div>

        <div className="group dark:bg-gray-800 dark:border-gray-700  bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-md hover:shadow-2xl transition duration-300">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-100 group-hover:scale-110 transition">
            <FaShower className="text-blue-500 text-3xl" />
          </div>

          <h3 className="mt-6 dark:text-white text-2xl font-bold text-gray-900">
            Clean Hygiene
          </h3>

          <p className="mt-3 text-gray-500 dark:text-white text-sm leading-relaxed">
            Regular grooming and cleaning keeps your pet fresh and healthy.
          </p>
        </div>

        <div className="group dark:bg-gray-800 dark:border-gray-700  bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-md hover:shadow-2xl transition duration-300">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-green-100 group-hover:scale-110 transition">
            <FaKitMedical className="text-green-500 text-3xl" />
          </div>

          <h3 className="mt-6 dark:text-white text-2xl font-bold text-gray-900">
            Vet Checkups
          </h3>

          <p className="mt-3 dark:text-white text-gray-500 text-sm leading-relaxed">
            Regular vet visits help prevent illness and ensure good health.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
