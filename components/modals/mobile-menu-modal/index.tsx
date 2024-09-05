"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { MdOutlineContactMail } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Logo from "@/components/logo";

const MobileMenuModal = () => {
  const { isOpen, onClose } = useMobileMenu((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-8 bg-white rounded-3xl shadow-2xl max-w-lg mx-auto transform scale-95 transition-transform duration-300 ease-out hover:scale-100">
        <SheetHeader className="mb-8">
          <SheetTitle>
            <div className="flex items-center justify-center space-x-2">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-bold text-gray-900">
                Ceylon Grocery
              </span>
            </div>
          </SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-6">
          <SheetClose asChild>
            <Link href="/products">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition duration-200 ease-in-out shadow-sm hover:shadow-md">
                <FaTag className="text-2xl text-emerald-600 mr-4" />
                <span className="text-lg font-semibold text-gray-800">
                  Products
                </span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-amber-50 transition duration-200 ease-in-out shadow-sm hover:shadow-md">
                <AiOutlineInfoCircle className="text-2xl text-amber-600 mr-4" />
                <span className="text-lg font-semibold text-gray-800">
                  About
                </span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/contact">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition duration-200 ease-in-out shadow-sm hover:shadow-md">
                <MdOutlineContactMail className="text-2xl text-blue-600 mr-4" />
                <span className="text-lg font-semibold text-gray-800">
                  Contact
                </span>
              </div>
            </Link>
          </SheetClose>
        </div>
        <SheetFooter className="mt-8"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuModal;
