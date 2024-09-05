import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link href={"/"}>
      <div className="flex space-x-2 items-center ">
        <Logo />
        <span className="text-lg text-black font-medium">Ceylon Grocery</span>
      </div>
    </Link>
  );
};

export default NavLogo;
