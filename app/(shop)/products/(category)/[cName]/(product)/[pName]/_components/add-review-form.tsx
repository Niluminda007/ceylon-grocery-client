"use client";

import { addReview } from "@/actions/add-review";
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface AddReviewFormProps {
  productId: string;
}

const AddReviewForm = ({ productId }: AddReviewFormProps) => {
  const params = useParams<{ pName: string }>();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const { execute } = useAction(addReview, {
    onSuccess: (data) => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({
        queryKey: ["product", params.pName],
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    execute({ productId, score: rating, comment });
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Add a Review
      </h2>
      <form action={onSubmit}>
        <div className="mb-4"></div>
        <div className="mb-4">
          <label className="block text-gray-700">Review</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => setRating(index + 1)}
                className={`cursor-pointer ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
