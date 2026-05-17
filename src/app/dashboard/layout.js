import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex gap-5">
      <DashboardNavbar />
      <div className="bg-red-500">{children}</div>
    </div>
  );
};

export default DashboardLayout;
