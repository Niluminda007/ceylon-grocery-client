"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CartItemsPane from "./cart-items-pane";
import useCheckOut from "@/hooks/use-checkout";

const CartItemsPaneMobile = () => {
  const completedStages = useCheckOut((state) => state.completedStages);

  return (
    <div className="md:hidden block p-4 bg-white rounded-lg shadow-md">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="side-bar-pane">
          <AccordionTrigger className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="text-lg font-medium text-gray-700">
              View Your Cart
            </span>
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
            <CartItemsPane />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CartItemsPaneMobile;
