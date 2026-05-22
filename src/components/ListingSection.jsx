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
    <section className="min-h-screen bg-gray-50 p-6">
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
            <h1 className="text-4xl font-black text-gray-900">
              My Listings 🐾
            </h1>
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

            <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90">Available Pets</p>
              <h2 className="text-4xl font-black mt-2">
                {pets.filter((p) => p.status === "pending" || !p.status).length}
              </h2>
            </div>

            <div className="bg-pink-500 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90">Adopted Pets</p>
              <h2 className="text-4xl font-black mt-2">
                {pets.filter((p) => p.status === "approved").length}
              </h2>
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
                    src={pet?.imageUrl || "/default-pet.png"}
                    alt={pet?.name || "pet"}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-xs font-semibold">
                    ${pet?.adoptionFee}
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
                        pet.status === "approved"
                          ? "bg-emerald-100 text-emerald-600"
                          : pet.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {pet.status || "pending"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <p>
                      <span className="font-semibold text-gray-900">Age:</span>{" "}
                      {pet.age}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-900">
                        Gender:
                      </span>{" "}
                      {pet.gender}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-900">
                        Location:
                      </span>{" "}
                      {pet.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Requests petId={pet.petId} />

                    <Link href={`/pet-details/${pet.petId}`}>
                      <button className="w-full py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2">
                        <FaEye /> View
                      </button>
                    </Link>

                    <Link href={`/dashboard/update/${pet._id}`}>
                      <button className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2">
                        <FaEdit /> Edit
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
