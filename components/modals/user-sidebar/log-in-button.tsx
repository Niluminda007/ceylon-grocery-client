"use client";

import { useState } from "react";
import { useUserSideBar } from "@/hooks/use-user-sidebar";
import Link from "next/link";
import { HiOutlineLogin } from "react-icons/hi";

export const LogInButton = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const closeUserSideBar = useUserSideBar((state) => state.onClose);

  const handleClick = () => {
    closeUserSideBar();
    setIsRedirecting(true);
  };

  return (
    <div className="relative w-full">
      <Link
        href="/auth/login"
        onClick={handleClick}
        className={`cursor-pointer flex items-center justify-center p-4 rounded-md transition ease-in-out duration-150 group ${
          isRedirecting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-black text-white hover:scale-110"
        }`}
        aria-label="Login"
      >
        <HiOutlineLogin className="text-xl mr-2 transition ease-in-out duration-150 group-hover:-translate-x-2" />
        <span>{isRedirecting ? "Redirecting..." : "Login"}</span>
      </Link>
      {isRedirecting && (
        <div className="absolute top-full left-0 mt-2 text-xs text-gray-500">
          Redirecting to login page...
        </div>
      )}
    </div>
  );
};
