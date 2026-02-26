"use client";
 
import { useCart } from "../context/CartContext";

import Link from "next/link";
 
export default function Warenkorb() {

  const { cart } = useCart();
 
  const gesamtpreis = cart.reduce(

    (sum, item) => sum + item.preis,

    0

  );
 
  return (
<main className="min-h-screen p-10 bg-gray-100">
<h1 className="text-3xl font-bold mb-8">

        Warenkorb
</h1>
 
      {cart.length === 0 ? (
<p>Dein Warenkorb ist leer.</p>

      ) : (
<>
<div className="space-y-4">

            {cart.map((item, index) => (
<div

                key={index}

                className="bg-white p-4 rounded shadow flex justify-between"
>
<span>{item.titel}</span>
<span>{item.preis} €</span>
</div>

            ))}
</div>
 
          <div className="mt-6 text-xl font-semibold">

            Gesamt: {gesamtpreis.toFixed(2)} €
</div>
 
          <Link

            href="/checkout"

            className="inline-block mt-6 bg-black text-white px-6 py-2 rounded"
>

            Zur Kasse
</Link>
</>

      )}
</main>

  );

}
 