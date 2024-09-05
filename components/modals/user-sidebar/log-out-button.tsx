"use client";

import { useState } from "react";
import { logout } from "@/actions/logout";
import { HiOutlineLogout } from "react-icons/hi";

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="button"
      onClick={!isLoading ? onClick : undefined}
      className={`cursor-pointer flex items-center p-4 rounded-xl transition ease-in-out duration-150 ${
        isLoading
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-red-500 text-white hover:bg-red-600"
      }`}
    >
      <HiOutlineLogout className="text-xl mr-3" />
      <span className="text-sm font-semibold">
        {isLoading ? "Logging out..." : "Logout"}
      </span>
    </div>
  );
};
