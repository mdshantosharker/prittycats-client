"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyRequestsPage = () => {
  const [adopted, setAdopted] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    const getData = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`http://localhost:5000/adopted`);

        const data = await res.json();

        setAdopted(Array.isArray(data) ? data.filter(Boolean) : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user?.id]);

  console.log(adopted);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
    });

    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:5000/adopted/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        setAdopted(adopted.filter((item) => item._id !== id));

        Swal.fire({
          title: "Cancelled",
          text: "Request cancelled successfully",
          icon: "success",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900">My Requests</h1>

        <p className="text-gray-500 mt-2">Manage all your adoption requests</p>
      </div>

      <div className="hidden md:grid grid-cols-6 bg-black text-white rounded-2xl px-6 py-4 font-semibold mb-4">
        <p>Pet Name</p>
        <p>Request Date</p>
        <p>Pickup Date</p>
        <p>Status</p>
        <p>View</p>
        <p>Cancel</p>
      </div>

      {adopted.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border">
          <h2 className="text-2xl font-bold text-gray-800">
            No Requests Found
          </h2>

          <p className="text-gray-500 mt-2">
            You have not requested any pet yet.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {adopted.map((request) => (
          <div
            key={request._id}
            className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:shadow-md transition"
          >
            <div>
              <p className="text-xs text-gray-400 md:hidden">Pet Name</p>

              <h2 className="font-bold text-gray-900 text-lg">
                {request.name}
              </h2>
            </div>

            <div>
              <p className="text-xs text-gray-400 md:hidden">Request Date</p>

              <p className="text-gray-700">
                {new Date(
                  parseInt(request._id.substring(0, 8), 16) * 1000,
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 md:hidden">Pickup Date</p>

              <p className="text-gray-700">
                {request.picUpDate &&
                request.picUpDate.year &&
                request.picUpDate.month &&
                request.picUpDate.day
                  ? new Date(
                      request.picUpDate.year,
                      request.picUpDate.month - 1,
                      request.picUpDate.day,
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 md:hidden">Status</p>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  request.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : request.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {request.status}
              </span>
            </div>

            <Link href={`/pet-details/${request.petId}`}>
              <button className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
                <FaEye />
                View
              </button>
            </Link>

            <button
              onClick={() => handleCancel(request._id)}
              className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaTrash />
              Cancel
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRequestsPage;
