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

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    const res = await fetch("http://localhost:5000/adopted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
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
      <div className="max-w-sm mx-auto lg:h-[40%] rounded-3xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50 shadow-lg p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-400 via-green-500 to-teal-400"></div>

        <div className="flex justify-center mb-4 mt-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-emerald-600">
          Pet Already Adopted
        </h2>

        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          This lovely pet has already found a new home 🐾
        </p>

        <div className="mt-5">
          <span className="inline-flex items-center gap-2 bg-white border border-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Adoption Completed
          </span>
        </div>
      </div>
    );
  }

  if (requestData) {
    const status = requestData.status;

    if (status === "pending") {
      return (
        <div className="w-full lg:h-[40%] bg-linear-to-br  from-orange-50 to-pink-50 border border-orange-100 p-8 rounded-3xl shadow-lg text-center max-w-md mx-auto">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full"></span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Request Pending</h2>

          <p className="mt-3 text-gray-500 leading-relaxed">
            Your adoption request has been sent successfully 🐾
            <br />
            Please wait for the pet owner’s response.
          </p>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Waiting for approval
            </span>
          </div>
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className="lg:h-[40%] w-full flex flex-col items-center justify-center max-w-xl bg-linear-to-br from-red-50 to-pink-50 border border-red-100 p-5 rounded-2xl shadow-md text-center mx-auto">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-600">Request Rejected</h2>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Your adoption request was not approved.
            <br />
            You cannot apply again for this pet 🐾
          </p>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Application closed
            </span>
          </div>
        </div>
      );
    }

    // if (status === "approved") {
    //   return (
    //     <div className="lg:h-[40%] max-w-sm mx-auto rounded-3xl border border-red-100 bg-linear-to-br from-white to-red-50 shadow-lg p-6 text-center relative overflow-hidden">
    //       <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-500 via-pink-500 to-rose-400"></div>

    //       <div className="flex justify-center mb-4 mt-2">
    //         <div className="relative">
    //           <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-red-100 to-pink-100 flex items-center justify-center shadow-inner">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="w-8 h-8 text-red-500"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               strokeWidth={2.5}
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M6 18L18 6M6 6l12 12"
    //               />
    //             </svg>
    //           </div>

    //           <span className="absolute -top-1 -right-1 flex h-3 w-3">
    //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
    //             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    //           </span>
    //         </div>
    //       </div>

    //       <h2 className="text-xl font-extrabold text-red-600">
    //         Request Rejected
    //       </h2>

    //       <p className="mt-2 text-sm text-gray-500 leading-relaxed">
    //         Unfortunately, your adoption request was not approved.
    //         <br />
    //         You cannot apply again for this pet 🐾
    //       </p>

    //       <div className="mt-5">
    //         <span className="inline-flex items-center gap-2 bg-white border border-red-100 text-red-500 px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
    //           <span className="w-2 h-2 rounded-full bg-red-500"></span>
    //           Application Closed
    //         </span>
    //       </div>
    //     </div>
    //   );
    // }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl dark:text-white font-black text-slate-900 mb-6 tracking-tight pb-3 border-b border-slate-100">
        Adoption Form
      </h2>

      <form onSubmit={handleAdopted} className="space-y-6 ">
        <div>
          <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pet Name
          </label>
          <input
            type="text"
            value={pet.name}
            readOnly
            className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 bg-slate-50 text-slate-500 font-medium cursor-not-allowed select-none outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            User Name
          </label>
          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 bg-slate-50 text-slate-500 font-medium cursor-not-allowed select-none outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            User Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 bg-slate-50 text-slate-500 font-medium cursor-not-allowed select-none outline-none"
          />
        </div>

        <div className="relative">
          <DateField isRequired onChange={setPicUpDate} className="w-full">
            <Label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pickup Date
            </Label>

            <DateField.Group className="w-full flex border border-slate-200 rounded-2xl px-4 py-3.5 bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-slate-900 transition-all duration-200">
              <DateField.Input className="w-full flex gap-1 outline-none text-slate-800 font-medium">
                {(segment) => (
                  <DateField.Segment
                    segment={segment}
                    className="focus:bg-slate-200 rounded px-0.5 outline-none"
                  />
                )}
              </DateField.Input>
            </DateField.Group>
          </DateField>
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Message
          </label>
          <textarea
            onChange={(e) => setMassage(e.target.value)}
            rows="5"
            placeholder="Why do you want to adopt this pet?"
            className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 placeholder-slate-400 font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full dark:bg-white dark:text-black bg-slate-900 text-white py-4 rounded-2xl text-base font-bold shadow-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Adopt Now
        </button>
      </form>
    </div>
  );
};

export default AdoptionFrom;
