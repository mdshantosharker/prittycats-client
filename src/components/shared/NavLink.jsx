"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({ href, children,className }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${pathname === href ? "bg-red-400 text-white" : ""} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
