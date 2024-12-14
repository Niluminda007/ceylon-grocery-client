"use client";

import Logo from "@/components/logo";
import React from "react";
import { CldImage } from "next-cloudinary";
import { FaLeaf, FaShippingFast, FaSmile } from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader";
import { ExtendedFeedback } from "@/types/feedback";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
const About = () => {
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
    <div className="px-4 md:px-8 lg:px-16 py-10 bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0">
          <Image
            className={`object-contain rounded-full`}
            src="/ceylon-logo-full.jpg"
            alt="logo"
            height={256}
            width={256}
          />
          {/* <Logo
            height={256}
            width={256}
            className="w-full h-full object-contain"
          /> */}
        </div>
        <div className="flex flex-col text-center md:text-left max-w-2xl">
          <h1 className="text-5xl text-neutral-700 font-bold mb-4 hover:text-green-600 transition-colors duration-300">
            Our Journey
          </h1>
          <p className="text-neutral-800 text-lg leading-relaxed">
            Founded in 2023, our story began with a passion to bridge the gap
            between Sri Lanka and the world. Recognizing the challenges faced by
            expatriates in accessing authentic Sri Lankan products, we embarked
            on a mission to bring the flavors and comforts of home to those
            living abroad. From humble beginnings, our commitment to quality and
            authenticity has earned us the loyalty of customers worldwide.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center">
          <FaLeaf className="text-green-600 text-7xl mb-4 animate-pulse" />
          <h2 className="text-xl font-medium text-neutral-700 hover:text-green-600 transition-colors duration-300">
            Authenticity
          </h2>
          <p className="text-neutral-600 mt-2">
            Every product we offer is carefully sourced to ensure it meets the
            highest standards of quality, bringing you the true taste of Sri
            Lanka.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-blue-600 text-7xl mb-4 animate-bounce" />
          <h2 className="text-xl font-medium text-neutral-700 hover:text-blue-600 transition-colors duration-300">
            Fast Delivery
          </h2>
          <p className="text-neutral-600 mt-2">
            We understand the importance of timely delivery, especially when it
            comes to cravings for home. We ensure that your favorite products
            reach you quickly and in perfect condition.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaSmile className="text-yellow-600 text-7xl mb-4 animate-pulse" />
          <h2 className="text-xl font-medium text-neutral-700 hover:text-yellow-600 transition-colors duration-300">
            Customer Satisfaction
          </h2>
          <p className="text-neutral-600 mt-2">
            Our customers are our top priority. We strive to provide an
            exceptional shopping experience, ensuring that you feel connected to
            your roots, no matter where you are.
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CldImage
          className="w-full h-64 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          alt="Sri Lankan spices"
          width="800"
          height="600"
          src="ceylon-grocery/about-us/about_spices_aab0m5.jpg"
          quality={80}
          format="webp"
        />
        <CldImage
          className="w-full h-64 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          alt="Sri Lankan traditional food"
          width="800"
          height="600"
          src="ceylon-grocery/about-us/fast_delivery_m2j20m.webp"
          quality={80}
          format="webp"
        />
        <CldImage
          className="w-full h-64 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          alt="Sri Lankan culture"
          width="800"
          height="600"
          src="ceylon-grocery/about-us/satisfaction_czmo6c.webp"
          quality={80}
          format="webp"
        />
      </div>

      {/* Timeline Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-semibold text-neutral-700 text-center mb-8">
          Our Milestones
        </h2>
        <div className="relative">
          <div className="absolute w-1 bg-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-green-600 z-10"></div>
              <div className="mt-4 md:mt-0 md:ml-8 bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
                <h3 className="text-2xl font-semibold">2023</h3>
                <p className="text-neutral-600 mt-2">
                  Founded our company with a mission to connect Sri Lanka to the
                  world.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-blue-600 z-10"></div>
              <div className="mt-4 md:mt-0 md:ml-8 bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
                <h3 className="text-2xl font-semibold">2024</h3>
                <p className="text-neutral-600 mt-2">
                  Expanded our product line to include a wide range of authentic
                  Sri Lankan items.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-yellow-600 z-10"></div>
              <div className="mt-4 md:mt-0 md:ml-8 bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
                <h3 className="text-2xl font-semibold">2025</h3>
                <p className="text-neutral-600 mt-2">
                  Reached our first 10,000 customers worldwide, marking a
                  significant milestone in our journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 py-12">
        <h2 className="text-4xl font-semibold text-neutral-700 text-center mb-8">
          What Our Customers Say
        </h2>
        {isLoading && <Loader text="Loading feedbacks..." />}
        {isError && (
          <div className="text-red-600 font-semibold text-center">
            Error loading feedbacks
          </div>
        )}
        {!isLoading && feedbacks && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-neutral-600">
                  &quot;{feedback.comment}&quot;
                </p>
                <div className="mt-4 flex items-center justify-center">
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
                <div className="mt-4 text-right font-semibold text-neutral-700">
                  - {feedback.user.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold text-neutral-700">
          Join Us on Our Journey
        </h2>
        <p className="text-neutral-600 mt-4 max-w-3xl mx-auto">
          Whether you&apos;re longing for the flavors of home or simply
          exploring new tastes, we invite you to be part of our growing
          community. Together, let&apos;s celebrate the rich culinary heritage
          of Sri Lanka, wherever you may be.
        </p>
        <Link
          href="/products"
          className="w-60 mt-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Explore Our Products
        </Link>
      </div>

      {/* Footer */}
    </div>
  );
};

export default About;
