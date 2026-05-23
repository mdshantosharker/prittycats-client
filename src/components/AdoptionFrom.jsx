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

  const { data } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    const getRequest = async () => {
      try {
        if (!user?.id || !pet?._id) return;
        const res = await fetch(
          `http://localhost:5000/adopted/${pet._id}/${user.id}`,
        );
        const data = await res.json();
        setRequestData(data || null);
      } catch (err) {
        console.log(err);
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

    const adoptedData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      userEmail: user.email,
      ownerEmail: pet?.ownerEmail,
      petId: pet._id,
      name: pet.name,
      massage,
      picUpDate,
      status: "pending",
    };

    const res = await fetch("http://localhost:5000/adopted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adoptedData),
    });

    const data = await res.json();

    if (data.alreadyExists) {
      setRequestData(data.data);
      Swal.fire("Already Requested", `Status: ${data.data.status}`, "info");
      return;
    }

    setRequestData({ ...adoptedData, _id: data.insertedId });

    Swal.fire("Success", "Request sent", "success");
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-3xl shadow">Loading...</div>;
  }

  if (pet?.adopted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow text-center">
        <h2 className="text-2xl font-bold text-red-600">
          This pet is already adopted
        </h2>
      </div>
    );
  }

  if (requestData) {
    const status = requestData.status;

    if (status === "pending") {
      return (
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <h2 className="text-xl font-bold">Request Pending</h2>
          <p className="mt-2 text-gray-500">Wait for owner response</p>
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600">Request Rejected</h2>
          <p className="mt-2 text-gray-500">
            You cannot apply again for this pet
          </p>
        </div>
      );
    }

    if (status === "approved") {
      return (
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <h2 className="text-xl font-bold text-green-600">
            Approved / Adopted
          </h2>
        </div>
      );
    }
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow">
      <h2 className="text-2xl font-bold mb-4">Adoption Form</h2>

      <form onSubmit={handleAdopted} className="space-y-4">
        <input
          value={pet.name}
          readOnly
          className="w-full p-3 border rounded-xl"
        />

        <input
          value={user?.name || ""}
          readOnly
          className="w-full p-3 border rounded-xl"
        />

        <input
          value={user?.email || ""}
          readOnly
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          onChange={(e) => setMassage(e.target.value)}
          placeholder="Message"
          className="w-full p-3 border rounded-xl"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Adopt Now
        </button>
      </form>
    </div>
  );
};

export default AdoptionFrom;
