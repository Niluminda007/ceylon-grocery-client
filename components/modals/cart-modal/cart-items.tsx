"use client";
import useCartStore from "@/hooks/use-cart";
import CartProduct from "./cart-product";

const CartItems = () => {
  const items = useCartStore((state) => state.cart);
  return (
    <div className="flex flex-col space-y-4">
      {items.map((item, index) => (
        <CartProduct key={index} item={item} />
      ))}
    </div>
  );
};

export default CartItems;
