"use client";

import { addFeedback } from "@/actions/add-feedback";
import { useAction } from "@/hooks/use-action";
import React, { useState } from "react";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

export const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const { execute, isLoading } = useAction(addFeedback, {
    onSuccess: (data) => {
      toast.success("Feedback added successfully");
      queryClient.invalidateQueries({ queryKey: ["user-feedbacks"] });

      setComment("");
      setRating(0);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({ score: rating, comment });
  };

  return (
    <div className="mt-8 p-8 bg-gradient-to-r from-green-50 to-blue-100 rounded-xl shadow-lg">
      <Image
        src="/feedback/feed_back.jpg"
        alt="Feedback"
        height={160}
        width={600}
        className="w-full h-40 object-cover rounded-t-lg mb-6"
      />
      <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Share Your Experience
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-gray-800 text-lg mb-2">
            Your Feedback
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 text-lg mb-2">Rating</label>
          <div className="flex items-center justify-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={36}
                onClick={() => setRating(index + 1)}
                className={`cursor-pointer transition-colors duration-200 ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
