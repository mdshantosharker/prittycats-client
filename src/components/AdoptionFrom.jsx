"use client";

import { authClient } from "@/lib/auth-client";
import { DateField, Label } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdoptionFrom = ({ pet }) => {
  const [picUpDate, setPicUpDate] = useState(null);
  const [massage, setMassage] = useState("");

  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    adoptionFee,
    vaccinationStatus,
    location,
    species,
    imageUrl,
    age,
    breed,
    gender,
    healthStatus,
  } = pet;

  const { data } = authClient.useSession();
  const user = data?.user;
  console.log(pet);
  console.log(user);

  useEffect(() => {
    const getRequest = async () => {
      try {
        if (!user?.id || !pet?._id) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/adopted/${pet._id}/${user.id}`,
        );

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        setRequestData(data || null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, [user?.id, pet?._id]);

  const handleAdopted = async (e) => {
    e.preventDefault();

    if (user?.email === pet?.ownerEmail) {
      toast.error("Owner can not adopt pet");
      return;
    }

    try {
      const adoptedData = {
        userId: user.id,
        userImage: user.image,
        userName: user.name,
        userEmail: user.email,
        ownerEmail: pet?.ownerEmail,
        petId: pet._id,
        name: pet.name,
        adoptionFee,
        imageUrl,
        location,
        massage,
        age,
        vaccinationStatus,
        species,
        breed,
        gender,
        healthStatus,
        picUpDate,
        status: "pending",
      };

      const res = await fetch("http://localhost:5000/adopted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptedData),
      });

      const data = await res.json();

      if (data.alreadyExists) {
        setRequestData(data.data);

        Swal.fire({
          title: "Already Requested",
          text: `Current Status: ${data.data.status}`,
          icon: "info",
        });

        return;
      }

      setRequestData({
        ...adoptedData,
        _id: data.insertedId,
      });

      Swal.fire({
        title: "Request Submitted",
        text: "Your adoption request has been sent to the owner",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-10">
        <p className="text-center font-semibold">Loading...</p>
      </div>
    );
  }

  if (requestData) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6">
            🐾
          </div>

          <h2 className="text-3xl font-black text-gray-900">Request Sent</h2>

          <p className="text-gray-500 mt-3">
            Your adoption request has been sent successfully.
          </p>

          <div className="mt-8 w-full bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-700">Pet Name</span>

              <span className="font-bold">{requestData.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Status</span>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  requestData.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : requestData.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {requestData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Adoption Form</h2>

      <form onSubmit={handleAdopted} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Pet Name</label>

          <input
            type="text"
            value={pet.name}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Name</label>

          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Email</label>

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <DateField isRequired onChange={setPicUpDate} className="w-full">
            <Label>Pickup Date</Label>

            <DateField.Group>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </DateField>
        </div>

        <div>
          <label className="block mb-2 font-medium">Message</label>

          <textarea
            onChange={(e) => setMassage(e.target.value)}
            rows="5"
            placeholder="Why do you want to adopt this pet?"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
        >
          Adopt Now
        </button>
      </form>
    </div>
  );
};

export default AdoptionFrom;
