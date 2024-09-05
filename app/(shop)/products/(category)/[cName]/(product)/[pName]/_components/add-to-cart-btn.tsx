// "use client";

// import Counter from "@/components/counter";
// import useCartStore from "@/hooks/use-cart";
// import { decimalToNumber } from "@/lib/utils";
// import { CartItem } from "@/types/cart";
// import { ExtendedProduct } from "@/types/product";

// import Decimal from "decimal.js";
// import React, { useState } from "react";
// import { RiShoppingCart2Line } from "react-icons/ri";
// import { toast } from "sonner";
// import { v4 as uuidv4 } from "uuid";

// interface AddToCartProps {
//   product: ExtendedProduct;
// }

// const AddToCart = ({ product }: AddToCartProps) => {
//   const [quantity, setQuantity] = useState<number>(1);
//   const cartState = useCartStore();

//   const addToCart = () => {
//     const priceDecimal = new Decimal(product.price);

//     const cartItem: CartItem = {
//       id: uuidv4(),
//       product,
//       quantity: quantity,
//       unitPrice: decimalToNumber(product.price),
//       subTotal: decimalToNumber(product.price) * quantity,
//       discount: 0,
//       total: decimalToNumber(product.price) * quantity,
//     };

//     cartState.addToCart(cartItem);
//     toast.success(`Added ${quantity} of ${product.name} to cart`);
//   };

//   return (
//     <div className="mt-4 flex items-center">
//       <Counter count={quantity} setCount={setQuantity} />
//       <button
//         onClick={addToCart}
//         disabled={!product.inStock}
//         className="ml-4 bg-[#5BFB23] text-black text-lg py-2 px-4 flex items-center justify-center rounded-md transition-all hover:bg-white hover:text-black"
//       >
//         <RiShoppingCart2Line className="mr-2 text-xl" />
//         Add To Cart
//       </button>
//     </div>
//   );
// };

// export default AddToCart;

"use client";

import Counter from "@/components/counter";
import useCartStore from "@/hooks/use-cart";
import { decimalToNumber } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { ExtendedProduct } from "@/types/product";
import React, { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface AddToCartProps {
  product: ExtendedProduct;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const cartState = useCartStore();

  const addToCart = () => {
    const existingItem = cartState.cart.find(
      (item) => item.product.id === product.id
    );
    const totalQuantityInCart = existingItem ? existingItem.quantity : 0;

    if (totalQuantityInCart >= product.stockCount) {
      toast.error(
        `You've already added the maximum available quantity of ${product.name} to your cart.`
      );
      return;
    }

    if (totalQuantityInCart + quantity > product.stockCount) {
      toast.error(
        `Only ${product.stockCount - totalQuantityInCart} more items of ${
          product.name
        } are available.`
      );
      return;
    }

    const cartItem: CartItem = {
      id: uuidv4(),
      product,
      quantity: quantity,
      unitPrice: decimalToNumber(product.price),
      subTotal: decimalToNumber(product.price) * quantity,
      discount: 0,
      total: decimalToNumber(product.price) * quantity,
    };

    cartState.addToCart(cartItem);
    cartState.onOpen();
    toast.success(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="mt-4">
      {!product.inStock ? (
        <div className="text-red-600 font-semibold text-lg">Out of Stock</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-y-4 items-center">
          <Counter
            count={quantity}
            setCount={setQuantity}
            maxCount={product.stockCount}
          />
          <button
            onClick={addToCart}
            disabled={!product.inStock || quantity > product.stockCount}
            className={`md:ml-4 text-lg py-2 px-4 flex items-center justify-center rounded-md transition-all ${
              !product.inStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#5BFB23] text-black hover:bg-white hover:text-black"
            }`}
          >
            <RiShoppingCart2Line className="mr-2 text-xl" />
            {product.inStock ? "Add To Cart" : "Out of Stock"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
