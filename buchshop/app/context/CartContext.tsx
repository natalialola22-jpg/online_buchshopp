"use client";
 
import { createContext, useContext, useState, useEffect } from "react";
 
type CartItem = {
  buch_id: number;
  titel: string;
  preis: number;
  menge: number;
};
 
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "menge">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clearCart: () => void;
};
 
const CartContext = createContext<CartContextType | undefined>(
  undefined
);
 
export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
 
  // ✅ DAS HAT DIR NOCH GEFEHLT
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
 
  function addToCart(item: Omit<CartItem, "menge">) {
    setCart((prev) => {
      const existing = prev.find((p) => p.buch_id === item.buch_id);
 
      if (existing) {
        return prev.map((p) =>
          p.buch_id === item.buch_id
            ? { ...p, menge: p.menge + 1 }
            : p
        );
      }
 
      return [...prev, { ...item, menge: 1 }];
    });
  }
 
  function increase(id: number) {
    setCart((prev) =>
      prev.map((p) =>
        p.buch_id === id ? { ...p, menge: p.menge + 1 } : p
      )
    );
  }
 
  function decrease(id: number) {
    setCart((prev) =>
      prev
        .map((p) =>
          p.buch_id === id ? { ...p, menge: p.menge - 1 } : p
        )
        .filter((p) => p.menge > 0)
    );
  }
 
  function remove(id: number) {
    setCart((prev) =>
      prev.filter((p) => p.buch_id !== id)
    );
  }
 
  function clearCart() {
    setCart([]);
  }
 
  return (
<CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        remove,
        clearCart,
      }}
>
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