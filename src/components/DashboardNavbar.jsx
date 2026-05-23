import Link from "next/link";
import React from "react";
import { FaList, FaPlus, FaPaw } from "react-icons/fa";
import NavLink from "./shared/NavLink";

const DashboardNavbar = () => {
  return (
    <div className="w-full">
      <nav className="flex flex-col gap-3">
        <NavLink
          href={"/dashboard/my-requests"}
          className="
    flex items-center gap-3 px-4 py-3 rounded-xl
    bg-gray-50 text-gray-700
    hover:bg-pink-50 hover:text-pink-600

    dark:bg-gray-700 dark:text-white
    dark:hover:bg-gray-600 dark:hover:text-pink-400

    transition font-medium
  "
        >
          <FaList />
          My Requests
        </NavLink>

        <NavLink
          href={"/dashboard/add-pet"}
          className="
    flex items-center gap-3 px-4 py-3 rounded-xl
    bg-gray-50 text-gray-700
    hover:bg-indigo-50 hover:text-indigo-600

    dark:bg-gray-700 dark:text-white
    dark:hover:bg-gray-600 dark:hover:text-indigo-400

    transition font-medium
  "
        >
          <FaPlus />
          Add Pet
        </NavLink>

        <NavLink
          href={"/dashboard/my-listing"}
          className="
    flex items-center gap-3 px-4 py-3 rounded-xl
    bg-gray-50 text-gray-700
    hover:bg-green-50 hover:text-green-600

    dark:bg-gray-700 dark:text-white
    dark:hover:bg-gray-600 dark:hover:text-green-400

    transition font-medium
  "
        >
          <FaPaw />
          My Listings
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
