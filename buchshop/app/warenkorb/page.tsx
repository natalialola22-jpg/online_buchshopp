"use client";
 
import { useCart } from "@/app/context/CartContext";

import Link from "next/link";
 
export default function Warenkorb() {

  const { cart, increase, decrease, remove } = useCart();
 
  const gesamtpreis = cart.reduce(

    (sum, item) => sum + item.preis * item.menge,

    0

  );
 
  if (cart.length === 0) {

    return <p>Dein Warenkorb ist leer.</p>;

  }
 
  return (
<main className="p-10">
<h1 className="text-3xl font-bold mb-8">

        Warenkorb
</h1>
 
      <div className="space-y-4">

        {cart.map((item) => (
<div

            key={item.buch_id}

            className="bg-white p-4 rounded shadow flex justify-between items-center"
>
<div>
<div className="font-semibold">

                {item.titel}
</div>
<div>{item.preis} €</div>
</div>
 
            <div className="flex items-center gap-3">
<button

                onClick={() => decrease(item.buch_id)}

                className="px-3 py-1 bg-gray-200 rounded"
>

                −
</button>
 
              <span>{item.menge}</span>
 
              <button

                onClick={() => increase(item.buch_id)}

                className="px-3 py-1 bg-gray-200 rounded"
>

                +
</button>
 
              <button

                onClick={() => remove(item.buch_id)}

                className="text-red-500 ml-4"
>

                Entfernen
</button>
</div>
</div>

        ))}
</div>
 
      <div className="mt-8 flex justify-between items-center">
<div className="text-xl font-semibold">

          Gesamt: {gesamtpreis.toFixed(2)} €
</div>
 
        <Link

          href="/checkout"

          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
>

          Zur Kasse
</Link>
</div>
</main>

  );

}
 