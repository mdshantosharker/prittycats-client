"use client";
import Link from "next/link";
import Image from "next/image";
import { FaEdit, FaEye } from "react-icons/fa";
import Requests from "./Requests";
import DeleteModal from "./DeleteModal";

const ListingSection = ({ pets = [] }) => {
  const isEmpty = !pets || pets.length === 0;
  console.log(pets);

  return (
    <section className="min-h-screen  dark:bg-transparent bg-gray-50 p-6">
      {isEmpty ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
          <div className="text-6xl mb-4">🐾</div>

          <h2 className="text-3xl font-black text-gray-800">No Pets Found</h2>

          <p className="text-gray-500 mt-2 max-w-md">
            You haven’t added any pets yet. Start by adding your first listing
            and manage adoption requests easily.
          </p>

          <Link href="/dashboard/add-pet">
            <button className="mt-6 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              + Add New Pet
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h1 className="text-4xl dark:text-white font-black text-gray-900">
              My Listings 🐾
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your pets, requests and adoption status
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-700 dark:border-none rounded-3xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-500 dark:text-white text-sm">
                Total Listings
              </p>
              <h2 className="text-4xl dark:text-white font-black mt-2 text-gray-900">
                {pets.length}
              </h2>
            </div>

            <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90">Available Pets</p>
              <h2 className="text-4xl font-black mt-2">
                {pets.filter((p) => p.adopted === false).length}
              </h2>
            </div>

            <div className="bg-pink-500 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90">Adopted Pets</p>
              <h2 className="text-4xl font-black mt-2">
                {pets.filter((p) => p.adopted === true).length}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="group bg-gray-100 dark:bg-gray-700 dark:border-none rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden m-3 rounded-[1.5rem] bg-gray-50">
                  <Image
                    src={pet?.imageUrl || "/default-pet.png"}
                    alt={pet?.name || "pet"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm tracking-wide border border-white/40">
                    ${pet?.adoptionFee}
                  </div>
                </div>

                <div className="p-6 pt-3 grow flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-amber-500 transition-colors duration-300">
                        {pet.name}
                      </h2>
                      <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md mt-1.5 tracking-wide uppercase">
                        {pet.breed}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3.5 px-4 bg-gray-50 rounded-2xl text-xs mb-6 border border-gray-100/50">
                      <div className="text-center border-r border-gray-200 last:border-0">
                        <p className="text-gray-400 font-medium mb-0.5">Age</p>
                        <p className="font-extrabold text-gray-800">
                          {pet.age}
                        </p>
                      </div>
                      <div className="text-center border-r border-gray-200 last:border-0">
                        <p className="text-gray-400 font-medium mb-0.5">
                          Gender
                        </p>
                        <p className="font-extrabold text-gray-800 capitalize">
                          {pet.gender}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 font-medium mb-0.5">
                          Location
                        </p>
                        <p className="font-extrabold text-gray-800 truncate px-1">
                          {pet.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Requests petId={pet._id} />

                    <Link href={`/pet-details/${pet._id}`} className="w-full">
                      <button className="w-full h-full cursor-pointer py-3 rounded-xl border border-gray-200 bg-white dark:text-black  font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-sm">
                        <FaEye /> View
                      </button>
                    </Link>

                    <Link
                      href={`/dashboard/update/${pet._id}`}
                      className="w-full"
                    >
                      <button className="w-full h-full cursor-pointer py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-sm hover:shadow-lg hover:shadow-amber-500/20 active:scale-95">
                        <FaEdit className="text-sm" /> Edit
                      </button>
                    </Link>

                    <DeleteModal pet={pet} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ListingSection;
