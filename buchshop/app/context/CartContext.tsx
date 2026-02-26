"use client";
 
import { createContext, useContext, useState } from "react";
 
type CartItem = {

  buch_id: number;

  titel: string;

  preis: number;

};
 
type CartContextType = {

  cart: CartItem[];

  addToCart: (item: CartItem) => void;

};
 
const CartContext = createContext<CartContextType | undefined>(

  undefined

);
 
export function CartProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [cart, setCart] = useState<CartItem[]>([]);
 
  function addToCart(item: CartItem) {

    setCart((prev) => [...prev, item]);

  }
 
  return (
<CartContext.Provider value={{ cart, addToCart }}>

      {children}
</CartContext.Provider>

  );

}
 
export function useCart() {

  const context = useContext(CartContext);

  if (!context) {

    throw new Error("useCart must be used inside CartProvider");

  }

  return context;

}
 