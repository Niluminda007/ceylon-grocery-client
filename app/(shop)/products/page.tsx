"use client";
import { FaArrowRight } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

import { CldImage } from "next-cloudinary";
import { categoryLinks } from "@/constants/categories";

const page = () => {
  return (
    <div className="flex min-h-[500px] p-0 lg:p-6">
      <div className="flex-[.1] flex flex-col justify-start gap-8 py-4">
        <h2 className="text-lg md:text-xl lg:text-2xl text-gray-900 font-bold">
          Products
        </h2>
        <div className="flex flex-col gap-4">
          {categoryLinks.map((category) => (
            <div key={`category_${category.id}`}>
              <Link
                href={category.path}
                className="flex group cursor-pointer items-center gap-2 p-2 rounded-md hover:bg-gray-200 transition duration-200"
              >
                <span className="text-sm md:text-lg font-medium text-gray-700 ease-linear duration-150 group-hover:text-gray-900">
                  {category.name}
                </span>
                <FaArrowRight
                  fontSize="1rem"
                  className="transition opacity-0 text-gray-700 ease-linear duration-150 font-semibold -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-gray-900"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-[0.05] md:flex-[.1] border-0 border-r border-gray-300"></div>
      <div className="w-full flex flex-[.8] ">
        <div className="ml-2 lg:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryLinks.map((link) => (
            <Link
              key={link.id}
              className="group flex flex-col gap-4"
              href={link.path}
            >
              <div className="overflow-hidden xs:h-[150px] md:h-[200px] lg:h-[230px] rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
                <CldImage
                  className="w-full h-full object-cover"
                  width="480"
                  height="600"
                  format="webp"
                  quality="50"
                  sizes="(max-width: 480px) 100vw, 50vw"
                  src={link.image}
                  alt="Spices_Img"
                />
              </div>
              <span className="text-lg font-semibold text-gray-800 opacity-60 transition ease-linear duration-150 group-hover:opacity-100">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
