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
  console.log(user);
  useEffect(() => {
    const getData = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/adopted?userId=${user?.id}`,
        );

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
    <section className="min-h-screen  light:bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 ">My Requests</h1>

        <p className="text-gray-500 mt-2 ">Manage all your adoption requests</p>
      </div>

      <div className="hidden md:grid grid-cols-6  bg-black text-white rounded-2xl px-6 py-4 font-semibold mb-4">
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
            className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 bg-white  border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          >
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wider text-gray-400 uppercase md:hidden">
                Pet Name
              </p>
              <h2 className="font-bold text-black  text-lg tracking-tight wrap-break-word whitespace-normal">
                {request.name}
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wider text-gray-400 uppercase md:hidden">
                Request Date
              </p>
              <p className="text-sm font-medium text-gray-600 ">
                {new Date(
                  parseInt(request._id.substring(0, 8), 16) * 1000,
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wider text-gray-400 uppercase md:hidden">
                Pickup Date
              </p>
              <p className="text-sm font-semibold text-gray-700 ">
                {request.picUpDate?.year &&
                request.picUpDate?.month &&
                request.picUpDate?.day
                  ? new Date(
                      request.picUpDate.year,
                      request.picUpDate.month - 1,
                      request.picUpDate.day,
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

           
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wider text-gray-400 uppercase md:hidden">
                Status
              </p>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  request.status === "approved"
                    ? "bg-emerald-50  text-emerald-600  border border-emerald-200 "
                    : request.status === "rejected"
                      ? "bg-rose-50  text-rose-600  border border-rose-200 "
                      : "bg-amber-50  text-amber-600  border border-amber-200 "
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    request.status === "approved"
                      ? "bg-emerald-500"
                      : request.status === "rejected"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                  }`}
                />
                {request.status}
              </span>
            </div>

            <Link href={`/pet-details/${request.petId}`} className="w-full">
              <button className="w-full cursor-pointer bg-gray-900 hover:bg-black  text-white py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95">
                <FaEye className="text-base opacity-80" />
                View Details
              </button>
            </Link>

            <button
              onClick={() => handleCancel(request._id)}
              disabled={request.status !== "pending"}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm transition-all active:scale-95
      ${
        request.status === "pending"
          ? "cursor-pointer bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 "
          : "cursor-not-allowed bg-gray-50 text-gray-500 border border-gray-100 "
      }`}
            >
              <FaTrash className="text-xs opacity-80" />
              Cancel
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRequestsPage;
