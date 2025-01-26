"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import useCartStore from "@/hooks/use-cart";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import CartItems from "./cart-items";
import { FaEuroSign } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUserSideBar } from "@/hooks/use-user-sidebar";

const CartModal = () => {
  const { totalItems, total, isOpen, onClose } = useCartStore((state) => ({
    totalItems: state.totalItems,
    total: state.total,
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const isLoggedIn = !!useCurrentUser();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-6 bg-gray-100 rounded-lg shadow-xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <div className="mt-6 flex justify-between items-center">
            <SheetTitle className="text-2xl font-bold text-gray-600 flex items-center">
              <FaShoppingCart className="mr-2" />
              Your Cart
            </SheetTitle>
            <div className="text-lg text-gray-700 flex items-center">
              {totalItems} items
            </div>
          </div>
          <SheetDescription className="text-lg text-gray-600 mt-2">
            Review and manage your cart items
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 overflow-auto max-h-[60vh]">
          <CartItems />
        </div>
        <SheetFooter>
          <div className="w-full flex flex-col mt-6 border-t pt-4 space-y-4">
            <div className="text-lg font-semibold text-gray-800 flex items-center">
              <FaEuroSign className="mr-2" />
              Total: {total.toFixed(2)}
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 ">
              <SheetClose asChild>
                <Button
                  variant={"destructive"}
                  className="w-full py-3 text-sm flex items-center justify-center"
                >
                  <AiOutlineShopping className="mr-2" />
                  Continue Shopping
                </Button>
              </SheetClose>

              {totalItems == 0 ? (
                <Button
                  variant={"secondary"}
                  className="w-full py-3 text-sm  flex items-center justify-center"
                  disabled
                >
                  <MdOutlineShoppingCartCheckout className="mr-2" />
                  Checkout
                </Button>
              ) : (
                <SheetClose asChild>
                  {isLoggedIn ? (
                    <Link href={"/checkout/info"}>
                      <Button
                        variant={"secondary"}
                        className="w-full py-3 text-sm flex items-center justify-center"
                      >
                        <MdOutlineShoppingCartCheckout className="mr-2" />
                        Checkout
                      </Button>
                    </Link>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="secondary"
                          className="w-full py-3 text-sm flex items-center justify-center"
                          aria-label="Login required for checkout"
                        >
                          <MdOutlineShoppingCartCheckout className="mr-2" />
                          Checkout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Log in required</AlertDialogTitle>
                          <AlertDialogDescription>
                            To proceed with checkout, please log in. Would you
                            like to log in now?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>
                            <Link href="/auth/login" onClick={onClose}>
                              Log In
                            </Link>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </SheetClose>
              )}
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartModal;
