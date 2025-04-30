import Link from "next/link";
import Logo from "@/components/logo";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-3">
            <Logo height={40} width={40} />
            <span className="text-xl font-semibold">Ceylon Grocery</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="flex space-x-6 text-sm">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/profile/feedback"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="flex space-x-4">
            <Link
              href="https://wa.me/37126291271"
              aria-label="WhatsApp"
              target="_blank"
            >
              <FaWhatsapp className="text-2xl text-gray-400 hover:text-white transition-colors" />
            </Link>
            <Link
              href="https://www.instagram.com/ceylongrocery.lv"
              aria-label="Instagram"
              target="_blank"
            >
              <FaInstagram className="text-2xl text-gray-400 hover:text-white transition-colors" />
            </Link>
            <Link
              href="https://www.facebook.com/ceylongrocerylatvia"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebookF className="text-2xl text-gray-400 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom with Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        © 2024 Ceylon Grocery. All rights reserved.
      </div>
    </footer>
  );
};
