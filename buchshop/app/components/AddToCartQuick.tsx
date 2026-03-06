"use client";
 
import { useCart } from "../context/CartContext";
import { useState } from "react";
 
export default function AddToCartQuick({ buch }: any) {
 
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
 
  function handleAdd() {
 
    addToCart({
      buch_id: buch.buch_id,
      titel: buch.titel,
      preis: buch.preis
    });
 
    setAdded(true);
 
    // nach 2 Sekunden wieder zurücksetzen
    setTimeout(() => {
      setAdded(false);
    }, 2000);
 
  }
 
  return (
<button
      onClick={handleAdd}
      className={`mt-3 px-4 py-2 rounded w-full transition 
      ${added 
        ? "bg-green-600 text-white" 
        : "bg-black text-white hover:bg-gray-800"}`}
>
      {added ? "✓ Hinzugefügt" : "In den Warenkorb"}
</button>
  );
}