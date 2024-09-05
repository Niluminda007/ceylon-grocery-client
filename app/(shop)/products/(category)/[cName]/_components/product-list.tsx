import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";

import { ExtendedProduct } from "@/types/product";

interface ProductListProps {
  products: ExtendedProduct[];
}

export const ProductListSkeleton = () => {
  return (
    <div className="w-full px-4 gap-6 mt-4 flex flex-wrap relative justify-center">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full sm:w-[270px] h-[350px] rounded-lg mb-4 animate-pulse bg-gray-200"
        />
      ))}
    </div>
  );
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="w-full px-4 gap-6 mt-4 flex flex-wrap relative justify-center">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
