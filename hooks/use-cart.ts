import { CartItem } from "@/types/cart";
import { Discount } from "@prisma/client";
import { create } from "zustand";

type CartState = {
  cart: CartItem[];
  isOpen: boolean;
  totalItems: number;
  total: number;
  discounts: Discount[];
  onOpen: () => void;
  onClose: () => void;
  addToCart: (item: CartItem) => void;
  updateCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setDiscount: (discount: Discount) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  isOpen: false,
  totalItems: 0,
  total: 0,
  discounts: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),

  addToCart: (item) =>
    set((state) => {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.product.id === item.product.id
      );

      let updatedCart;
      if (existingCartItemIndex !== -1) {
        updatedCart = state.cart.map((cartItem, index) => {
          if (index === existingCartItemIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            };
          }
          return cartItem;
        });
      } else {
        updatedCart = [...state.cart, item];
      }

      const newTotal = updatedCart.reduce(
        (sum, cartItem) => sum + cartItem.quantity * cartItem.unitPrice,
        0
      );
      const newTotalItems = updatedCart.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );

      return {
        cart: updatedCart,
        total: newTotal,
        totalItems: newTotalItems,
      };
    }),

  updateCart: (item) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex] = item;

        const newTotal = updatedCart.reduce(
          (sum, cartItem) => sum + cartItem.quantity * cartItem.unitPrice,
          0
        );
        const newTotalItems = updatedCart.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );

        return {
          cart: updatedCart,
          total: newTotal,
          totalItems: newTotalItems,
        };
      }

      return state;
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);

      const newTotal = updatedCart.reduce(
        (sum, cartItem) => sum + cartItem.quantity * cartItem.unitPrice,
        0
      );
      const newTotalItems = updatedCart.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );

      return {
        cart: updatedCart,
        total: newTotal,
        totalItems: newTotalItems,
      };
    }),
  setDiscount: (discount) =>
    set((state) => {
      const isDuplicate = !!state.discounts.find(
        (existingDiscount) =>
          existingDiscount.discountType === discount.discountType
      );
      if (!isDuplicate) {
        return { ...state, discounts: [...state.discounts, discount] };
      }
      return state;
    }),
  clearCart: () =>
    set({
      cart: [],
      total: 0,
      totalItems: 0,
    }),
}));

export default useCartStore;
