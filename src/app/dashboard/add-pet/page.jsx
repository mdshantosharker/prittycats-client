"use client";

import { authClient } from "@/lib/auth-client";

const AddPetPage = () => {
  const { data } = authClient.useSession();
  // console.log(data);
  const user = data?.user;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = Object.fromEntries(new FormData(e.currentTarget));

    const pet = await fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    }).then((res) => res.json());

    // const adopted = await fetch("http://localhost:5000/adopted", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(petData),
    // }).then((res) => res.json());

    console.log({ pet });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Pet For Adoption
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block mb-2 font-medium">Pet Name</label>
            <input
              type="text"
              placeholder="Enter pet name"
              name="name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Species</label>
            <select
              name="species"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Breed</label>
            <input
              type="text"
              placeholder="Enter breed"
              name="breed"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              name="age"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              name="gender"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              name="imageUrl"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Health Status</label>
            <input
              type="text"
              placeholder="Healthy / Sick"
              name="healthStatus"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Vaccination Status</label>
            <select
              name="vaccinationStatus"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Status</option>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              name="location"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Adoption Fee</label>
            <input
              type="number"
              placeholder="Enter fee"
              name="adoptionFee"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Owner Email</label>
            <input
              type="email"
              name="ownerEmail"
              value={user?.email ?? ""}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows="5"
              placeholder="Write pet details..."
              name="description"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetPage;
