"use client";

import { useEffect, useState } from "react";
import CartModal from "../modals/cart-modal";
import UserSideBarModal from "../modals/user-sidebar";
import AddressModal from "../modals/address-modal";
import SearchModal from "../modals/search-modal";
import MobileMenuModal from "../modals/mobile-menu-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CartModal />
      <UserSideBarModal />
      <AddressModal />
      <SearchModal />
      <MobileMenuModal />
    </>
  );
};

export default ModalProvider;
