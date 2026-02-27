"use client";
 
import { useCart } from "@/app/context/CartContext";

import { useRouter } from "next/navigation";
 
export default function Checkout() {

  const { cart,clearCart } = useCart();

  const router = useRouter();
 
  const gesamtpreis = cart.reduce(

    (sum, item) => sum + item.preis,

    0

  );
 
  async function handleCheckout() {

    await fetch("/api/bestellung", {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ items: cart }),

    });
    clearCart();
 
    router.push("/erfolg");

  }
 
  if (cart.length === 0) {

    return <p>Warenkorb ist leer.</p>;

  }
 
  return (
<main className="p-10">
<h1 className="text-2xl font-bold mb-6">

        Checkout
</h1>
 
      <div className="mb-4">

        Gesamt: {gesamtpreis.toFixed(2)} €
</div>
 
      <button

        onClick={handleCheckout}

        className="bg-black text-white px-6 py-2 rounded"
>

        Bestellung abschließen
</button>
</main>

  );

}
 