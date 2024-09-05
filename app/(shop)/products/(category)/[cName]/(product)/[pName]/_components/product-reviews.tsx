import { ExtendedReview } from "@/types";
import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";

interface ProductReviewsProps {
  reviews: ExtendedReview[];
}

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-2">
                <span className="text-lg font-medium text-gray-800">
                  {review.user.name}
                </span>
                <div className="ml-4 flex items-center">
                  {[...Array(5)].map((_, index) =>
                    index < review.rating ? (
                      <RiStarFill key={index} className="text-yellow-500" />
                    ) : (
                      <RiStarLine key={index} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <span>No reviews yet.</span>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
