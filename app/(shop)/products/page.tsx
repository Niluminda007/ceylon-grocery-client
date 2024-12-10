"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExtendedCategory } from "@/types/category";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader";
import CategorySidebar from "./_components/category-sidebar";
import CategoryGrid from "./_components/category-grid";

const ProductsPage = () => {
  const { data, isError, isLoading } = useQuery<ExtendedCategory[]>({
    queryKey: ["category-all"],
    queryFn: () => fetcher({ url: "/fetch/categories" }),
  });

  if (isLoading) {
    return <Loader text="Loading product categories..." />;
  }

  if (isError) {
    return (
      <div className="text-red-500 font-medium text-center mt-8">
        Failed to load product categories. Please try again later.
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-700 font-medium text-center mt-8">
        No product categories were found!
      </div>
    );
  }
  return (
    <div className="flex min-h-[500px] p-0 lg:p-6">
      <CategorySidebar categories={data} />
      <div className="flex flex-[0.05] md:flex-[.1] border-0 border-r border-gray-300"></div>
      <div className="w-full flex flex-[.8]">
        <CategoryGrid categories={data} />
      </div>
    </div>
  );
};

export default ProductsPage;
