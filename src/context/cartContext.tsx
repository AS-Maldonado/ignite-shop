import { ProductType } from "@/types/product";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartContextType {
  cart: ProductType[];
  quantity: number;
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: string) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  quantity: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState(0);

  function addToCart(product: ProductType) {
    setCart((prev) => {
      const productExists = prev.find((item) => item.id === product.id);

      if (productExists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setQuantity(cart.length);
  }, [cart, setQuantity]);

  return (
    <CartContext.Provider value={{ cart, quantity, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
