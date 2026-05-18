import Link from "next/link";
import React from "react";

const AllPetsPage = async () => {
  const res = await fetch("http://localhost:5000/pets", {
    method: "GET",
  });
  const pets = await res.json();
  console.log(pets);

  return (
    <div className="mt-5">
      <h1 className="text-center font-bold text-3xl mb-4">All pets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="h-60 overflow-hidden">
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{pet.name}</h2>

                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  {pet.species}
                </span>
              </div>

              <p className="text-gray-600">
                <span className="font-semibold text-black">Breed:</span>{" "}
                {pet.breed}
              </p>

              <div className="flex justify-between text-gray-600">
                <p>
                  <span className="font-semibold text-black">Age:</span>{" "}
                  {pet.age}
                </p>

                <p>
                  <span className="font-semibold text-black">Gender:</span>{" "}
                  {pet.gender}
                </p>
              </div>

              <div className="flex justify-between text-gray-600">
                <p>
                  <span className="font-semibold text-black">Health:</span>{" "}
                  {pet.healthStatus}
                </p>

                <p>
                  <span className="font-semibold text-black">Vaccine:</span>{" "}
                  {pet.vaccinationStatus}
                </p>
              </div>

              <p className="text-gray-600">
                <span className="font-semibold text-black">Location:</span>{" "}
                {pet.location}
              </p>

              <p className="text-lg font-bold text-black">
                Adoption Fee: ${pet.adoptionFee}
              </p>

              <Link
                href={`/pet-details/${pet._id}`}
                className="flex gap-3 pt-3"
              >
                <button className="w-full border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition">
                  View Details
                </button>

                <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Adopt Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPetsPage;
