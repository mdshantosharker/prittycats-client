"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Requests from "./Requests";

const ListingSection = ({ pets }) => {
  console.log(pets);
  //   const [selectedRequests, setSelectedRequests] = useState(null);
  const [available, setAvailable] = useState(pets.length);
  const [adopt, setAdopt] = useState(0);
  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900">My Listings 🐾</h1>

        <p className="text-gray-500 mt-2">
          Manage your pets, requests and adoption status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Listings</p>

          <h2 className="text-4xl font-black mt-2 text-gray-900">
            {pets.length}
          </h2>
        </div>

        <div className="bg-linear-to-r from-emerald-500 to-green-500 rounded-3xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Available Pets</p>

          <h2 className="text-4xl font-black mt-2">{available}</h2>
        </div>

        <div className="bg-linear-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Adopted Pets</p>

          <h2 className="text-4xl font-black mt-2">{adopt}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={pet.imageUrl}
                alt={pet.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-gray-700">
                {pet.species}
              </div>

              <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-xs font-semibold">
                ${pet.adoptionFee}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {pet.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">{pet.breed}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pet.status === "adopted"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {pet.status || "available"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>
                  <span className="font-semibold text-gray-900">Age:</span>{" "}
                  {pet.age}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Gender:</span>{" "}
                  {pet.gender}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Location:</span>{" "}
                  {pet.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Requests petId={pet._id} />

                <Link href={`/pet-details/${pet._id}`}>
                  <button className="w-full py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-2 transition">
                    <FaEye />
                    View
                  </button>
                </Link>

                <Link href={`/dashboard/update-pet/${pet._id}`}>
                  <button className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 transition">
                    <FaEdit />
                    Edit
                  </button>
                </Link>

                <button className="py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListingSection;
