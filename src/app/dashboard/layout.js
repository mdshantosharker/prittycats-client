import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex gap-5 container mx-auto px-6">
      <DashboardNavbar />
      <div className="bg-red-500 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
