"use client";

import Slider from "@/components/slider";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import ProductCard from "@/components/product-card";
import { ExtendedProduct } from "@/types/product";

const BestSellingSlider = () => {
  const { data, isLoading } = useQuery<ExtendedProduct[]>({
    queryKey: ["best-selling"],
    queryFn: () =>
      fetcher({
        url: "/fetch/products/best-selling",
        method: "GET",
      }),
  });

  if (isLoading) return <Loader />;

  return (
    data && (
      <Slider
        data={data}
        renderItem={(item) => <ProductCard product={item} tag="Best Selling" />}
      />
    )
  );
};

export default BestSellingSlider;
