import React from "react";
import Image from "next/image";
import Logo from "@/components/logo";
import ContactForm from "./_components/contact-form";
import { socialLinks } from "@/constants/social";

const Page = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      {/* Header Section */}
      <header className="mb-8">
        <Logo />
      </header>

      <h2 className="text-4xl text-neutral-900 font-extrabold mb-10 text-center">
        Get in Touch with Us
      </h2>

      {/* Contact Image */}
      <div className="flex justify-center w-full max-w-4xl mb-16">
        <Image
          src="/contact/contact_us.jpg"
          alt="Contact Us"
          width={600}
          height={400}
          className="w-full h-auto shadow-lg rounded-lg object-cover"
        />
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 lg:space-x-12 mb-16">
        {socialLinks.map(({ href, src, alt, label, hoverColor }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-center text-neutral-900 text-sm lg:text-lg font-semibold ${hoverColor}  transition-colors duration-300`}
          >
            <Image
              src={src}
              alt={alt}
              width={40}
              height={40}
              className="mx-auto mb-2"
            />
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <section className="w-full max-w-2xl">
        <ContactForm />
      </section>
    </div>
  );
};

export default Page;
