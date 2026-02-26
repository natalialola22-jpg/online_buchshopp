"use client";
 
import Link from "next/link";

import { useCart } from "@/app/context/CartContext";
 
export default function CartIndicator() {

  const { cart } = useCart();
 
  return (
<Link href="/warenkorb" className="relative">

      🛒 Warenkorb

      {cart.length > 0 && (
<span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">

          {cart.length}
</span>

      )}
</Link>

  );

}
 