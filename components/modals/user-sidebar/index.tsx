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
import { useUserSideBar } from "@/hooks/use-user-sidebar";
import UserProfile from "./user-profile";
import Link from "next/link";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import {
  FaCog,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { LogoutButton } from "./log-out-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogInButton } from "./log-in-button";

const UserSideBarModal = () => {
  const { isOpen, onClose } = useUserSideBar((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  const isLoggedIn = !!useCurrentUser();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-8 bg-white rounded-3xl shadow-lg max-w-lg mx-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>
            <UserProfile />
          </SheetTitle>
          <SheetDescription
            hidden
            className="text-md text-gray-500 mt-3"
          ></SheetDescription>
        </SheetHeader>
        {isLoggedIn ? (
          <div className="flex flex-col space-y-4">
            <SheetClose asChild>
              <Link href="/profile/account-details">
                <div className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition ease-in-out duration-150">
                  <MdPerson className="text-xl text-blue-600 mr-3" />
                  <span className="text-gray-700 font-medium">
                    Account Details
                  </span>
                </div>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/profile/settings">
                <div className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition ease-in-out duration-150">
                  <FaCog className="text-xl text-gray-600 mr-3" />
                  <span className="text-gray-700 font-medium">Settings</span>
                </div>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/profile/orders">
                <div className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition ease-in-out duration-150">
                  <MdShoppingCart className="text-xl text-blue-600 mr-3" />
                  <span className="text-gray-700 font-medium">
                    Order History
                  </span>
                </div>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/profile/addresses">
                <div className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition ease-in-out duration-150">
                  <FaMapMarkerAlt className="text-xl text-green-600 mr-3" />
                  <span className="text-gray-700 font-medium">Addresses</span>
                </div>
              </Link>
            </SheetClose>

            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Welcome Message */}
            <div>
              <h2 className="text-lg font-bold text-gray-800">Welcome!</h2>
              <p className="text-sm text-gray-600">
                Log in to access your account and explore personalized features.
              </p>
            </div>

            {/* Login Button */}
            <LogInButton />

            {/* Useful Links */}
            <div className="flex flex-col space-y-3 w-full">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition ease-in-out"
              >
                <FaShoppingBag className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Shop by Category
                </span>
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition ease-in-out"
              >
                <FaQuestionCircle className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        )}

        <SheetFooter className="mt-6"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserSideBarModal;
