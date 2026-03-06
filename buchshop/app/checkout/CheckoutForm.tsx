"use client";
 
import { useState } from "react";
import { useCart } from "../context/CartContext";
 
export default function CheckoutForm({ kunde }: any) {
 
  const { cart, clearCart } = useCart();
 
  const [vorname, setVorname] = useState(kunde?.kunden_vorname || "");
  const [nachname, setNachname] = useState(kunde?.kunden_nachname || "");
  const [email, setEmail] = useState(kunde?.email || "");
  const [adresse, setAdresse] = useState(kunde?.adresse || "");
  const [iban, setIban] = useState(kunde?.iban || "");
 
  const [saveData, setSaveData] = useState(false);
 
  async function handleSubmit(e: any) {
 
    e.preventDefault();
 
    if (!iban) {
      alert("Bitte IBAN eingeben");
      return;
    }
 
    try {
 
      const res = await fetch("/api/bestellung", {
 
        method: "POST",
 
        headers: {
          "Content-Type": "application/json"
        },
 
        body: JSON.stringify({
 
          items: cart,
 
          kunde: {
            vorname,
            nachname,
            email,
            adresse,
            iban
          },
 
          saveAddress: saveData
 
        })
 
      });
 
      const data = await res.json();
 
      if (data.success) {
 
        clearCart();
 
        window.location.href = "/erfolg";
 
      } else {
 
        alert(data.error || "Bestellung fehlgeschlagen");
 
      }
 
    } catch (error) {
 
      console.error(error);
      alert("Serverfehler bei der Bestellung");
 
    }
 
  }
 
  return (
 
    <main className="max-w-lg mx-auto bg-white p-6 rounded shadow">
 
      <h1 className="text-xl font-bold mb-6">
        Bestellung abschließen
</h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          placeholder="Vorname"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          placeholder="Nachname"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          placeholder="IBAN"
          className="border p-2 rounded"
          required
        />
 
        <label className="flex gap-2 items-center">
 
          <input
            type="checkbox"
            checked={saveData}
            onChange={() => setSaveData(!saveData)}
          />
 
          Daten dauerhaft im Konto speichern
 
        </label>
 
        <button className="bg-black text-white py-2 rounded hover:bg-gray-800">
          Bestellung abschließen
</button>
 
      </form>
 
    </main>
 
  );
 
}