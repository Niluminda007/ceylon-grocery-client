"use client";

import CartItemsPane from "./_components/cart-items-pane";
import CartItemsPaneMobile from "./_components/cart-items-pane-mobile";
import { CheckOutControl } from "./_components/check-out-control";
import CheckOutProgressBar from "./_components/check-out-progress-bar";

interface CheckOutLayoutProps {
  children: React.ReactNode;
}

const CheckOutLayout = ({ children }: CheckOutLayoutProps) => {
  return (
    <>
      <CheckOutControl />
      <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 max-w-[1280px] mx-auto h-full">
        {<CartItemsPaneMobile />}
        <div className="flex-grow w-full md:w-1/2">
          <div className="flex flex-col space-y-6">
            <CheckOutProgressBar />
            {children}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full relative">
          <div
            className={`hidden md:block absolute inset-0 
            }`}
          >
            <CartItemsPane />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutLayout;
