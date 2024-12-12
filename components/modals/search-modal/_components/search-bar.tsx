"use client";

import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import { decimalToNumber } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSearchModal } from "@/hooks/use-search-modal";
import { debounce } from "lodash";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onClose } = useSearchModal((state) => ({
    onClose: state.onClose,
  }));

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const {
    data,
    mutate: searchMutation,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: (keyWord: string): Promise<Product[]> =>
      fetcher({ url: "/fetch/products/search", params: { keyWord } }),
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const debouncedSearch = debounce((value: string) => {
    if (value.trim()) {
      searchMutation(value);
    }
  }, 300); // 300ms delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex flex-col w-full ">
      {/* Search Input */}
      <div className="relative h-16 w-full mb-4">
        <Input
          ref={inputRef}
          className="h-full w-full bg-gray-100 border border-gray-300 text-gray-800 text-lg placeholder-gray-500 rounded-lg focus:outline-none focus:border-black transition duration-200 px-4"
          onChange={handleChange}
          value={searchQuery}
          placeholder="Search products..."
        />

        <div
          role="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-3 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <SearchIcon className="text-white" />
        </div>
      </div>
      {isPending && <Loader text="searching..." />}

      {/* Error Message */}
      {isError && (
        <div className="text-lg text-red-500 mt-4">
          {`Something went wrong: ${error.message}`}{" "}
        </div>
      )}

      {/* No Results Feedback */}
      {!isPending && data?.length === 0 && (
        <div className="text-lg text-gray-600 mt-4">
          No results found for &quot;{searchQuery}&quot;. Try a different search
          term or{" "}
          <Link
            href="/products"
            className="text-blue-600 underline"
            onClick={onClose}
          >
            browse all products.
          </Link>
        </div>
      )}

      {/* Search Results */}
      {!isPending && data && data.length > 0 && (
        <div className="flex flex-col mt-4 space-y-3 max-h-80 overflow-y-auto">
          {data.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out flex items-center"
            >
              <div className="flex-shrink-0 w-12 h-12 mr-4 overflow-hidden rounded-lg">
                <CldImage
                  width={48}
                  height={48}
                  className="object-cover"
                  src={product.images[0]}
                  alt={`product_${product.name}`}
                />
              </div>
              <div className="flex-grow">
                <span className="text-lg font-semibold text-gray-800">
                  {product.name}
                </span>
                <span className="block text-sm text-gray-600">{`€ ${decimalToNumber(
                  product.price
                )}`}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
