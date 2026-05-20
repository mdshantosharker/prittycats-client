import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaEye, FaPaw } from "react-icons/fa";

const AllPetsPage = async () => {
  const res = await fetch("http://localhost:5000/pets", {
    method: "GET",
  });

  const pets = await res.json();
  console.log(pets);
  return (
    <section className="mt-24 px-6 py-10">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          All Pets 🐾
        </h1>
        <p className="text-gray-500 mt-3">Find your perfect furry companion</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src={pet.imageUrl}
                alt={pet.petName || "Pet image"}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                {pet.species}
              </div>

              <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                ${pet.adoptionFee}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>

                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {pet.gender}
                </span>
              </div>

              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">Breed:</span>{" "}
                {pet.breed}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Age:</span>{" "}
                  {pet.age}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Health:</span>{" "}
                  {pet.healthStatus}
                </p>
              </div>

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

                <button className="w-full py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2">
                  <FaPaw />
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPetsPage;
