import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaPaw } from "react-icons/fa";

const FeaturedPets = async () => {
  const res = await fetch("http://localhost:5000/pets", {
    method: "GET",
  });

  const pets = await res.json();

  return (
    <section className="mt-20 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Featured Pets 🐾
        </h1>
        <p className="text-gray-500 mt-2">
          Meet adorable pets waiting for a loving home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
        {pets.slice(0, 6).map((pet) => (
          <div
            key={pet._id}
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <div className="h-64 overflow-hidden relative">
              <Image
                src={pet.imageUrl}
                alt={pet.name}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold">
                {pet.species}
              </div>

              <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                ${pet.adoptionFee}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>

              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">Breed:</span>{" "}
                {pet.breed}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                {pet.location}
              </p>

              <div className="pt-4 flex gap-3">
                <Link href={`/pet-details/${pet._id}`} className="w-full">
                  <button className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                    <FaEye />
                    View Details
                  </button>
                </Link>

                <Link href={`/pet-details/${pet._id}`} className="w-full">
                  <button className="w-full py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2">
                    <FaPaw />
                    Adopt
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPets;
