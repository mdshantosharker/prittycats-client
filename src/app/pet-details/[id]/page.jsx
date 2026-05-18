import React from "react";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    method: "GET",
  });
  const pet = await res.json();
//   console.log(pet);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="h-full">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Top */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">{pet.name}</h1>

                <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
                  {pet.species}
                </span>
              </div>

              {/* Breed */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Breed</h3>
                <p className="text-gray-600">{pet.breed}</p>
              </div>

              {/* Age */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Age</h3>
                <p className="text-gray-600">{pet.age} Years</p>
              </div>

              {/* Gender */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Gender</h3>
                <p className="text-gray-600">{pet.gender}</p>
              </div>

              {/* Health Status */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Health Status
                </h3>
                <p className="text-gray-600">{pet.healthStatus}</p>
              </div>

              {/* Vaccination */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Vaccination Status
                </h3>
                <p className="text-gray-600">{pet.vaccinationStatus}</p>
              </div>

              {/* Location */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Location
                </h3>
                <p className="text-gray-600">{pet.location}</p>
              </div>

              {/* Adoption Fee */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Adoption Fee
                </h3>
                <p className="text-2xl font-bold text-black">
                  ${pet.adoptionFee}
                </p>
              </div>

              {/* Owner Email */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Owner Email
                </h3>
                <p className="text-gray-600">{pet.ownerEmail}</p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {pet.description}
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-10">
              <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
                Adopt Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
