"use client";
 
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";
 
export default function AddToCartButton({

  produkt,

}: {

  produkt: any;

}) {

  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
 
  function handleClick() {

    addToCart({

      buch_id: produkt.buch_id,

      titel: produkt.titel,

      preis: Number(produkt.preis),

    });
 
    setAdded(true);
 
    setTimeout(() => {

      setAdded(false);

    }, 1500);

  }
 
  return (
<button

      onClick={handleClick}

      className={`px-6 py-2 rounded transition ${

        added

          ? "bg-green-600 text-white"

          : "bg-black text-white hover:bg-gray-800"

      }`}
>

      {added ? "✓ Hinzugefügt" : "In den Warenkorb"}
</button>

  );

}
 