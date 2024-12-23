import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProductDetails from "./product-details";
import ProductReviews from "./product-reviews";
import AddReviewForm from "./add-review-form";
import { ExtendedProduct } from "@/types/product";

type ProductTabsProps = {
  product: ExtendedProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="details" className="mt-2 md:mt-4 lg:mt-8">
      <TabsList className="flex justify-center mb-6 bg-transparent rounded-lg p-1">
        <TabsTrigger
          value="details"
          style={{ backgroundColor: "#cbd5e1" }}
          className="px-2 md:px-6 py-2 text-sm md:text-lg font-medium text-gray-700  transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
          Product Description
        </TabsTrigger>
        {/* <TabsTrigger
          value="reviews"
          className="px-2 md:px-6 py-2 text-sm md:text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger
          value="add_review"
          className="px-2 md:px-6 py-2 text-sm md:text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
          Add Review
        </TabsTrigger> */}
      </TabsList>
      <TabsContent value="details">
        <ProductDetails product={product} />
      </TabsContent>
      {/* <TabsContent value="reviews">
        <ProductReviews reviews={product.reviews} />
      </TabsContent>
      <TabsContent value="add_review">
        <AddReviewForm productId={product.id} />
      </TabsContent> */}
    </Tabs>
  );
};

export default ProductTabs;
