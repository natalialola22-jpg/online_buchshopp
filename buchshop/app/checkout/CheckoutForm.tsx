"use client";
 
import { useState } from "react";
import { useCart } from "../context/CartContext";
 
export default function CheckoutForm({ kunde }: any) {
 
  const { cart, clearCart } = useCart();
 
  const [vorname, setVorname] = useState(kunde?.kunden_vorname || "");
  const [nachname, setNachname] = useState(kunde?.kunden_nachname || "");
  const [email, setEmail] = useState(kunde?.email || "");
 
  const [strasse, setStrasse] = useState(kunde?.strasse || "");
  const [hausnummer, setHausnummer] = useState(kunde?.hausnummer || "");
  const [plz, setPlz] = useState(kunde?.plz || "");
  const [ort, setOrt] = useState(kunde?.ort || "");
 
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
            strasse,
            hausnummer,
            plz,
            ort,
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
          value={strasse}
          onChange={(e) => setStrasse(e.target.value)}
          placeholder="Straße"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={hausnummer}
          onChange={(e) => setHausnummer(e.target.value)}
          placeholder="Hausnummer"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
          placeholder="PLZ"
          className="border p-2 rounded"
          required
        />
 
        <input
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          placeholder="Ort"
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
 
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Bestellung abschließen
</button>
 
      </form>
 
    </main>
 
  );
 
}