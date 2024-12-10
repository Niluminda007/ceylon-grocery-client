"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

import Loader from "@/components/loader";
import ProductHeader from "./_components/product-header";
import ProductTabs from "./_components/product-tabs";
import { ExtendedProduct } from "@/types/product";

interface ProductPageProps {
  params: {
    productSlug: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { data, isLoading, error } = useQuery<ExtendedProduct>({
    queryKey: ["product", params.productSlug],
    queryFn: () =>
      fetcher({
        url: "/fetch/product",
        params: { productSlug: params.productSlug },
      }),
  });
  return (
    <div className="min-h-screen ">
      {isLoading && <Loader />}
      {error && (
        <div className="text-center text-red-500">
          Error loading product data.
        </div>
      )}
      {!isLoading && data && (
        <div className=" max-w-lg md:max-w-7xl mx-auto p-2 md:p-8 shadow-xl rounded-lg mt-10">
          <ProductHeader product={data} />
          <ProductTabs product={data} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
