"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoOut = async () => {
    await authClient.signOut();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const pathname = usePathname();
  const { data } = authClient.useSession();
  const user = data?.user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "Pets" },
    ...(user ? [{ href: "/dashboard/my-requests", label: "Dashboard" }] : []),
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%] rounded-2xl backdrop-blur-xl dark:bg-slate-700/60 bg-slate-900/30 border border-white/10 shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 text-white">
        <Link href="/" className="text-xl font-bold tracking-wide">
          🐱 PrittyCats
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  isActive(item.href)
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
         
        </ul>

        

        <div className="hidden md:flex items-center gap-3">
           <div><ThemeToggle/></div>
          {user ? (
            <>
              <div className="relative flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      src={user.image}
                    />
                    <Avatar.Fallback>{user.name?.slice(0, 2)}</Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-white">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-white/50">Active</span>
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-44 bg-slate-900/90 border border-white/10 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      href="/dashboard/my-requests"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-white/10"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogoOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Login
              </Link>

              <Link href="/registration">
                <Button className="rounded-full bg-white text-black hover:bg-white/80">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-5 pb-5 text-white">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-sm transition ${
                  isActive(item.href)
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 border-t border-white/10" />

            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      src={user.image}
                    />
                    <Avatar.Fallback>{user.name?.slice(0, 2)}</Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-white">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-white/50">
                      Active User
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleLogoOut}
                  className="w-full rounded-xl bg-white/10 text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-white/5"
                >
                  Login
                </Link>

                <Link href="/registration" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-xl bg-white text-black">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
