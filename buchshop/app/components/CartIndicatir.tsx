"use client";
 
import Link from "next/link";

import { useCart } from "../context/CartContext";

import { useEffect, useState } from "react";
 
export default function CartIndicator() {
 
  const { cart } = useCart();
 
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {

    setMounted(true);

  }, []);
 
  // verhindert Hydration Fehler

  if (!mounted) return null;
 
  return (
<Link href="/warenkorb" className="relative">
 
      Warenkorb
 
      {cart.length > 0 && (
<span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">

          {cart.length}
</span>

      )}
 
    </Link>

  );

}
 