"use client";

import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { CiMenuBurger } from "react-icons/ci";

const MobileMenu = () => {
  const onOpen = useMobileMenu((state) => state.onOpen);

  return (
    <div
      className="flex md:hidden  items-center justify-center text-neutral-700 cursor-pointer"
      role="button"
      onClick={() => onOpen()}
    >
      <CiMenuBurger />
    </div>
  );
};

export default MobileMenu;
