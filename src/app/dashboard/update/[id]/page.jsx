"use client";

import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdatePage = () => {
  const { id } = useParams();
  console.log(id);
  const { data } = authClient.useSession();
  const user = data?.user;

  const [pet, setPet] = useState(null);

  useEffect(() => {
    const getPet = async () => {
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);
      const res = await fetch(`http://localhost:5000/pets/${id}`, {
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });
      const data = await res.json();
      setPet(data);
    };

    if (id) getPet();
  }, [id]);
  console.log(pet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    // console.log(petData);

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    const res = await fetch(`http://localhost:5000/pets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(petData),
    });
    const pet = await res.json();

    toast.success("Update Successfully");
    console.log(pet);
    console.log("Sending update:", petData);
  };

  return (
   <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6 transition-colors duration-300">
  <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl rounded-2xl p-8 md:p-10 transition-all">
    <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900 dark:text-white tracking-tight">
      Update Pet Adoption
    </h1>
    <p className="text-sm text-gray-500 dark:text-zinc-400 text-center mb-8">
      Modify the details below to update your pet's adoption listing information.
    </p>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Pet Name */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Pet Name</label>
        <input
          type="text"
          defaultValue={pet?.name}
          required
          placeholder="Enter pet name"
          name="name"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Species */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Species</label>
        <select
          name="species"
          value={pet?.species}
          onChange={(e) => setPet({ ...pet, species: e.target.value })}
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
        >
          <option value="" className="dark:bg-zinc-900">Select Species</option>
          <option value="Dog" className="dark:bg-zinc-900">Dog</option>
          <option value="Cat" className="dark:bg-zinc-900">Cat</option>
          <option value="Bird" className="dark:bg-zinc-900">Bird</option>
          <option value="Rabbit" className="dark:bg-zinc-900">Rabbit</option>
        </select>
      </div>

      {/* Breed */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Breed</label>
        <input
          defaultValue={pet?.breed}
          type="text"
          placeholder="Enter breed"
          name="breed"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Age */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Age</label>
        <input
          defaultValue={pet?.age}
          type="number"
          placeholder="Enter age"
          name="age"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Gender</label>
        <select
          value={pet?.gender || ""}
          onChange={(e) => setPet({ ...pet, gender: e.target.value })}
          name="gender"
          required
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
        >
          <option value="" className="dark:bg-zinc-900">Select Gender</option>
          <option value="Male" className="dark:bg-zinc-900">Male</option>
          <option value="Female" className="dark:bg-zinc-900">Female</option>
        </select>
      </div>

      {/* Image URL */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Image URL</label>
        <input
          defaultValue={pet?.imageUrl}
          type="text"
          placeholder="https://..."
          name="imageUrl"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Health Status */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Health Status</label>
        <input
          defaultValue={pet?.healthStatus}
          type="text"
          placeholder="Healthy / Sick"
          name="healthStatus"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Vaccination Status */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Vaccination Status</label>
        <select
          value={pet?.vaccinationStatus}
          name="vaccinationStatus"
          onChange={(e) =>
            setPet({ ...pet, vaccinationStatus: e.target.value })
          }
          required
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
        >
          <option value="" className="dark:bg-zinc-900">Select Status</option>
          <option value="Vaccinated" className="dark:bg-zinc-900">Vaccinated</option>
          <option value="Not Vaccinated" className="dark:bg-zinc-900">Not Vaccinated</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Location</label>
        <input
          defaultValue={pet?.location}
          type="text"
          placeholder="Enter location"
          name="location"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Adoption Fee */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Adoption Fee</label>
        <input
          defaultValue={pet?.adoptionFee}
          type="number"
          placeholder="Enter fee"
          name="adoptionFee"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      </div>

      {/* Owner Email */}
      <div className="md:col-span-2">
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Owner Email</label>
        <input
          type="email"
          name="ownerEmail"
          value={user?.email || ""}
          readOnly
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-100 dark:bg-zinc-800/80 text-gray-500 dark:text-zinc-400 font-medium cursor-not-allowed select-none"
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">Description</label>
        <textarea
          defaultValue={pet?.description}
          rows="4"
          placeholder="Write pet details..."
          name="description"
          className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-bold tracking-wide shadow-md hover:bg-green-400 dark:hover:bg-green-400 hover:text-black hover:shadow-lg active:scale-[0.99] transition duration-200"
        >
          Update pet Information
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default UpdatePage;
