
const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    method: "GET",
  });
  const pet = await res.json();
  //   console.log(pet);
  
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">
        
          <div className="h-112.5 overflow-hidden">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

      
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold">{pet.name}</h1>

              <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
                {pet.species}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold text-gray-800">Breed</h3>
                <p className="text-gray-600">{pet.breed}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Age</h3>
                <p className="text-gray-600">{pet.age} Years</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Gender</h3>
                <p className="text-gray-600">{pet.gender}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Health Status</h3>
                <p className="text-gray-600">{pet.healthStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Vaccination Status
                </h3>
                <p className="text-gray-600">{pet.vaccinationStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">{pet.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Adoption Fee</h3>
                <p className="text-2xl font-bold">${pet.adoptionFee}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Owner Email</h3>
                <p className="text-gray-600">{pet.ownerEmail}</p>
              </div>
            </div>

            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 text-xl mb-2">
                Description
              </h3>

              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Adoption Form</h2>

          <form  className="space-y-5">
            
            <div>
              <label className="block mb-2 font-medium">Pet Name</label>

              <input
                type="text"
                name="petName"
                value={pet.name}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

           
            <div>
              <label className="block mb-2 font-medium">User Name</label>

              <input
                type="text"
                name="userName"
                // value={user?.displayName}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            
            <div>
              <label className="block mb-2 font-medium">User Email</label>

              <input
                type="email"
                name="userEmail"
                // value={user?.email}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block mb-2 font-medium">Pickup Date</label>

              <input
                type="date"
                name="pickupDate"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-medium">Message</label>

              <textarea
                rows="5"
                name="message"
                placeholder="Why do you want to adopt this pet?"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Hidden Status */}
            <input type="hidden" name="status" value="pending" />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
            >
              Adopt Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
