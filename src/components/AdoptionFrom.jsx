"use client";
import { authClient } from "@/lib/auth-client";
import { DateField, Label } from "@heroui/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AdoptionFrom = ({ pet }) => {
  const [picUpDate, setPicUpDate] = useState(null);
  const [massage, setMassage] = useState(null);
  // console.log(new Date(picUpDate));
  const { adoptionFee, location, imageUrl } = pet;
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleAdopted = async (e) => {
    e.preventDefault();
    const adoptedData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      userEmail: user.email,
      petId: pet._id,
      name: pet.name,
      adoptionFee,
      imageUrl,
      location,
      massage,
      picUpDate: new Date(picUpDate),
      status: "pending",
    };
    const res = await fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptedData),
    });
    const data = await res.json();
    console.log(data);
    Swal.fire({
      title: "Request Submitted",
      text: "Your adoption request has been sent to the owner,You can track its status in My Requests",
      icon: "success",
    });
  };
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Adoption Form</h2>

      <form className="space-y-5">
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
            value={user?.name || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Email</label>

          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <DateField onChange={setPicUpDate} className="w-[256px]" name="date">
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
            name="message"
            placeholder="Why do you want to adopt this pet?"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <input type="hidden" name="status" value="pending" />

        <button
          onClick={handleAdopted}
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
