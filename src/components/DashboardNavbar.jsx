import Link from "next/link";
import React from "react";

const DashboardNavbar = () => {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        <Link href={"/dashboard/my-requests"}>My Requests</Link>
        <Link href={"/dashboard/add-pet"}>Add Pet</Link>
        <Link href={"/dashboard/my-listing"}>My Listings</Link>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
