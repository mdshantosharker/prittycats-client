"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({ href, children, className }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${pathname === href ? "bg-green-100! text-green-600! dark:bg-gray-600! dark:text-green-400!" : ""} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
