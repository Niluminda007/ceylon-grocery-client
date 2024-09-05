"use client";

import Slider from "@/components/slider";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import ProductCard from "@/components/product-card";

const NewArrivalsSlider = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["new-arrivals"],
    queryFn: () =>
      fetcher({
        url: "/fetch/products/new-arrivals",
        method: "GET",
      }),
  });
  if (isLoading) return <Loader />;
  return (
    data && (
      <Slider
        data={data}
        renderItem={(item: Product) => <ProductCard product={item} tag="New" />}
      />
    )
  );
};

export default NewArrivalsSlider;
