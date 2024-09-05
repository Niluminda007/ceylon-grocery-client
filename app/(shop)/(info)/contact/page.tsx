import Logo from "@/components/logo";
import Image from "next/image";
import React from "react";
import ContactForm from "./_components/contact-form";

const Page = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      {/* Header Section */}
      <div className="mb-8">
        <Logo />
      </div>

      <h2 className="text-4xl text-neutral-900 font-extrabold mb-10 text-center">
        Get in Touch with Us
      </h2>

      {/* Contact Information and Image */}
      <div className="grid md:grid-cols-2 gap-16 items-center w-full mb-16">
        <div className="flex justify-center">
          <Image
            width={600}
            height={400}
            alt="contact-two-image"
            src="/contact/contact_2.jpg"
            className="w-full h-auto shadow-lg rounded-lg object-cover"
          />
        </div>
        <div className="text-lg text-neutral-700 max-w-lg mx-auto">
          <p className="mb-6">
            We&apos;d love to hear from you! Follow us on social media, share
            your experiences, or get in touch with us directly. Whether you have
            custom requests, orders, or feedback, we&apos;re here to assist you
            24/7.
          </p>
          <p className="font-semibold">Our team is always ready to help!</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-4 lg:space-x-16 mb-16">
        <a
          href="https://wa.me/37126291271"
          className="text-center text-neutral-900 text-sm lg:text-lg font-semibold hover:text-green-600 transition-colors duration-300"
        >
          <Image
            src="/social/whatsapp.png"
            alt="WhatsApp"
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <span>+371 2629 1271</span>
        </a>
        <a
          href="https://www.instagram.com/ceylongrocery.lv"
          className="text-center text-neutral-900 text-sm lg:text-lg font-semibold hover:text-pink-600 transition-colors duration-300"
        >
          <Image
            src="/social/instagram.png"
            alt="Instagram"
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <span>@ceylongrocery.lv</span>
        </a>
        <a
          href="https://www.facebook.com/ceylongrocerylatvia"
          className="text-center text-neutral-900 text-sm lg:text-lg font-semibold hover:text-blue-600 transition-colors duration-300"
        >
          <Image
            src="/social/facebook.png"
            alt="Facebook"
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <span>Ceylon Grocery Latvia</span>
        </a>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
};

export default Page;
