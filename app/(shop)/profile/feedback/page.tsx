"use client";

import { useQuery } from "@tanstack/react-query";
import { FeedbackForm } from "./_components/feed-back-form";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader";
import { FaStar } from "react-icons/fa";
import { ExtendedFeedback } from "@/types/feedback";

const FeedbackPage = () => {
  const {
    data: feedbacks,
    isLoading,
    error,
    isError,
  } = useQuery<ExtendedFeedback[]>({
    queryKey: ["user-feedbacks"],
    queryFn: () => fetcher({ url: "/fetch/feedbacks" }),
  });

  return (
    <div className="mx-auto max-w-6xl p-10 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-2xl">
      <FeedbackForm />
      <div className="mt-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          What Our Customers Are Saying
        </h1>
        {isLoading && <Loader text="Loading feedbacks..." />}
        {isError && (
          <div className="text-red-600 font-semibold text-center">
            Error loading feedbacks
          </div>
        )}
        {!isLoading && feedbacks && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-lg italic text-gray-700 mb-4">
                  "{feedback.comment}"
                </p>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={24}
                      className={`transition-colors duration-200 ${
                        index < feedback.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-right font-semibold text-gray-800">
                  - {feedback.user.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
