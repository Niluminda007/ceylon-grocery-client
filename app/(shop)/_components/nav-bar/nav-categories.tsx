import { navLinks } from "@/constants/nav";
import Link from "next/link";
import React from "react";

const NavCategories = () => {
  return (
    <div className="flex items-center gap-6">
      {navLinks.map((item, index) => (
        <Link key={`${index}_${item.id}`} href={`${item.path}`}>
          <span className="nav_category text-neutral-500 text-sm font-medium transition-colors duration-300 ease-linear hover:text-neutral-700">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavCategories;
