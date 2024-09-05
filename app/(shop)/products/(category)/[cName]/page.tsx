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
        <CategoryHeaderSkeleton />
        <ProductListSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen  p-6">
      {data && (
        <>
          <CategoryHeader
            name={data.name}
            description={data.description}
            images={data.images}
          />
          <ProductList products={data.products} />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
