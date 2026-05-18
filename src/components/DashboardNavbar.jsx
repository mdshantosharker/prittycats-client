import Link from "next/link";
import React from "react";

const DashboardNavbar = () => {
  return (
    <div className="w-[40%] ">
      <ul className="flex flex-col  gap-5">
        <Link className="bg-gray-400" href={"/dashboard/my-requests"}>My Requests</Link>
        <Link className="bg-gray-400" href={"/dashboard/add-pet"}>Add Pet</Link>
        <Link className="bg-gray-400" href={"/dashboard/my-listing"}>My Listings</Link>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
