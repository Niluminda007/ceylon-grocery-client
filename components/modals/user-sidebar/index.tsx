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
import { FaCog, FaMapMarkerAlt } from "react-icons/fa";
import { LogoutButton } from "./log-out-button";

const UserSideBarModal = () => {
  const { isOpen, onClose } = useUserSideBar((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

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
                <span className="text-gray-700 font-medium">Order History</span>
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
        <SheetFooter className="mt-6"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserSideBarModal;
