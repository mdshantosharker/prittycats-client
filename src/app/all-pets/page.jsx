"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaPaw } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const AllPetsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [pets, setPets] = useState([]);

  console.log(pets);
  useEffect(() => {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (species) query.append("species", species);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, [search, species]);

  useEffect(() => {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (species) query.append("species", species);

    router.replace(`/all-pets?${query.toString()}`);
  }, [search, species]);

  return (
    <section className="bg-gray-50 dark:bg-black  pt-32 px-6 py-10">
      <div className="text-center mb-14">
        <h1 className="text-4xl dark:text-white md:text-5xl font-extrabold text-gray-900">
          All Pets 🐾
        </h1>
        <p className="text-gray-500 dark:text-white mt-3">
          Find your perfect furry companion
        </p>

        <div className="mt-8  flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pets by name..."
            className="px-4 py-3 border dark:bg-gray-800 rounded-xl w-full md:w-80"
          />

          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="
    px-4 py-3 border rounded-xl w-full md:w-60
    text-black
    dark:bg-gray-800 dark:text-white dark:border-gray-700
  "
          >
            <option value="">All Species</option>
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              value="Dog"
            >
              Dog
            </option>
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              value="Cat"
            >
              Cat
            </option>
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              value="Bird"
            >
              Bird
            </option>
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              value="Rabbit"
            >
              Rabbit
            </option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-72 overflow-hidden">
              <Image
                src={pet?.imageUrl || "/default-pet.png"}
                alt={pet?.name || "pet"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-full text-gray-700 dark:text-gray-200">
                  {pet.species}
                </span>

                <span className="px-3 py-1 text-xs font-bold bg-black/70 text-white rounded-full">
                  ${pet.adoptionFee}
                </span>
              </div>

              {pet.adoptionStatus ? (
                <>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">
                      Adopted
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                      Available
                    </span>
                  </div>
                </>
              )}

              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-2xl font-bold drop-shadow-lg">
                  {pet.name}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Breed", pet.breed],
                  ["Age", pet.age],
                  ["Health", pet.healthStatus],
                  ["Location", pet.location],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={`/pet-details/${pet._id}`} className="w-1/2">
                  <button className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2 cursor-pointer">
                    <FaEye />
                    Details
                  </button>
                </Link>

                {pet.adoptionStatus === "closed" ? (
                  <button
                    disabled
                    className="w-1/2 py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPaw />
                    Adopted
                  </button>
                ) : (
                  <Link href={`/pet-details/${pet._id}`} className="w-1/2">
                    <button className="w-full py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition flex items-center justify-center gap-2 cursor-pointer">
                      <FaPaw />
                      Adopt
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPetsPage;
