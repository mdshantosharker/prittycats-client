"use client";

import { authClient } from "@/lib/auth-client";
import { ObjectId } from "bson";
import React from "react";
import { toast } from "react-toastify";

const AddPetPage = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = new ObjectId().toString();

      const petData = {
        ...Object.fromEntries(new FormData(e.currentTarget)),
        ownerEmail: user?.email,
        _id: id,
      };

      const { data: tokenData } = await authClient.token();
      console.log(tokenData);

      const petRes = await fetch("http://localhost:5000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(petData),
      });

      if (!petRes.ok) {
        throw new Error("Failed to add pet");
      }

      const pet = await petRes.json();

      toast.success("Successfully Pet Added");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl rounded-2xl p-8 md:p-10 transition-all">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900 dark:text-white tracking-tight">
          Add Pet For Adoption
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 text-center mb-8">
          Help a pet find its forever home by filling out the details below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Pet Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Buddy"
              name="name"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Species
            </label>
            <select
              name="species"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
            >
              <option value="" className="dark:bg-zinc-900">
                Select Species
              </option>
              <option value="Dog" className="dark:bg-zinc-900">
                Dog
              </option>
              <option value="Cat" className="dark:bg-zinc-900">
                Cat
              </option>
              <option value="Bird" className="dark:bg-zinc-900">
                Bird
              </option>
              <option value="Rabbit" className="dark:bg-zinc-900">
                Rabbit
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Breed
            </label>
            <input
              type="text"
              placeholder="e.g., Golden Retriever"
              name="breed"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Age (Years/Months)
            </label>
            <input
              type="number"
              placeholder="Enter age"
              name="age"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Gender
            </label>
            <select
              name="gender"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
            >
              <option value="" className="dark:bg-zinc-900">
                Select Gender
              </option>
              <option value="Male" className="dark:bg-zinc-900">
                Male
              </option>
              <option value="Female" className="dark:bg-zinc-900">
                Female
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/pet.jpg"
              name="imageUrl"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Health Status
            </label>
            <input
              type="text"
              placeholder="e.g., Healthy / Fit"
              name="healthStatus"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Vaccination Status
            </label>
            <select
              name="vaccinationStatus"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white"
            >
              <option value="" className="dark:bg-zinc-900">
                Select Status
              </option>
              <option value="Vaccinated" className="dark:bg-zinc-900">
                Vaccinated
              </option>
              <option value="Not Vaccinated" className="dark:bg-zinc-900">
                Not Vaccinated
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Dhaka, Bangladesh"
              name="location"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Adoption Fee ($)
            </label>
            <input
              type="number"
              placeholder="Enter amount (0 for free)"
              name="adoptionFee"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Owner Email
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-100 dark:bg-zinc-800/80 text-gray-500 dark:text-zinc-400 font-medium cursor-not-allowed select-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Share some details about the pet's personality, habits, or history..."
              name="description"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none transition focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-bold tracking-wide shadow-md hover:bg-green-400 dark:hover:bg-green-400 hover:text-black hover:shadow-lg active:scale-[0.99] transition duration-200"
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
