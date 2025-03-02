import { ProductType } from "@/types/product";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartContextType {
  cart: ProductType[];
  quantity: number;
  addToCart: (product: ProductType) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  quantity: 0,
  addToCart: () => {},
});

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState(0);

  function addToCart(product: ProductType) {
    setCart((prev) => [...prev, product]);
  }

  useEffect(() => {
    setQuantity(cart.length);
    console.log(cart.length);
  }, [cart, setQuantity]);

  return (
    <CartContext.Provider value={{ cart, quantity, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
