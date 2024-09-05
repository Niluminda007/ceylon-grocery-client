"use client";

import Loader from "@/components/loader";
import { fetcher } from "@/lib/fetcher";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const categoryColors = [
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-pink-400 to-purple-500",
  "bg-gradient-to-r from-yellow-400 to-red-500",
];

const ShopByCategory = () => {
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher({ url: "/fetch/categories", method: "GET" }),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
        Shop By Category
      </h2>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ id, name, path, images }, index) => (
            <Link href={`/${path}`} key={id}>
              <div
                className={`overflow-hidden cursor-pointer flex flex-col gap-4 group transition-transform transform hover:scale-105 rounded-lg shadow-lg ${
                  categoryColors[index % categoryColors.length]
                }`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <CldImage
                    className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    width="320"
                    height="400"
                    format="webp"
                    quality="50"
                    sizes="(max-width: 320px) 100vw, 50vw"
                    src={images[0]}
                    alt={name}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-white rounded-b-lg">
                  <span className="text-lg font-semibold text-gray-700 uppercase group-hover:text-green-500 transition-colors duration-300">
                    {name}
                  </span>
                  <FaArrowRight
                    fontSize="1.5rem"
                    className="transition-transform transform group-hover:translate-x-2 group-hover:text-green-500"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopByCategory;
