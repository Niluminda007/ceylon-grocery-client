"use client";

import { useQuery } from "@tanstack/react-query";
import ProductList, { ProductListSkeleton } from "./_components/product-list";
import { fetcher } from "@/lib/fetcher";

import CategoryHeader, {
  CategoryHeaderSkeleton,
} from "./_components/category-header";
import { ExtendedCategory } from "@/types/category";

interface CategoryPageProps {
  params: {
    cName: string;
  };
}
const CategoryPage = ({ params }: CategoryPageProps) => {
  const { data, isLoading } = useQuery<ExtendedCategory>({
    queryKey: ["products", params.cName],
    queryFn: () =>
      fetcher({
        url: "/fetch/products/category",
        params: { cName: params.cName },
      }),
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col min-h-screen  p-6">
        <ProductListSkeleton />

        <CategoryHeaderSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen  p-6">
      {data && (
        <>
          <h1 className="p-6 text-5xl  font-bold uppercase text-left mb-4">
            {data.name}
          </h1>
          <ProductList products={data.products} />
          <CategoryHeader
            name={data.name}
            description={data.description}
            images={data.images}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
