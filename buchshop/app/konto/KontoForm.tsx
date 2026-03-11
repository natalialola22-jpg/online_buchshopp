"use client";
 
import { useState } from "react";
 
export default function KontoForm({ kunde }: any) {
 
  const [vorname, setVorname] = useState(kunde.kunden_vorname);
  const [nachname, setNachname] = useState(kunde.kunden_nachname);
 
  const [strasse, setStrasse] = useState(kunde.strasse || "");
  const [hausnummer, setHausnummer] = useState(kunde.hausnummer || "");
  const [plz, setPlz] = useState(kunde.plz || "");
  const [ort, setOrt] = useState(kunde.ort || "");
 
  const [iban, setIban] = useState(kunde.iban || "");
 
  async function handleSubmit(e: any) {
 
    e.preventDefault();
 
    const res = await fetch("/api/konto", {
 
      method: "POST",
 
      headers: {
        "Content-Type": "application/json"
      },
 
      body: JSON.stringify({
        vorname,
        nachname,
        strasse,
        hausnummer,
        plz,
        ort,
        iban
      })
 
    });
 
    if (res.ok) {
 
      alert("Daten gespeichert");
 
      window.location.reload();
 
    } else {
 
      alert("Fehler beim Speichern");
 
    }
 
  }
 
  return (
 
    <main className="max-w-lg mx-auto bg-white p-6 rounded shadow">
 
      <h1 className="text-xl font-bold mb-6">
        Mein Konto
</h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          placeholder="Vorname"
          className="border p-2 rounded"
        />
 
        <input
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          placeholder="Nachname"
          className="border p-2 rounded"
        />
 
        <input
          value={strasse}
          onChange={(e) => setStrasse(e.target.value)}
          placeholder="Straße"
          className="border p-2 rounded"
        />
 
        <input
          value={hausnummer}
          onChange={(e) => setHausnummer(e.target.value)}
          placeholder="Hausnummer"
          className="border p-2 rounded"
        />
 
        <input
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
          placeholder="PLZ"
          className="border p-2 rounded"
        />
 
        <input
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          placeholder="Ort"
          className="border p-2 rounded"
        />
 
        <input
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          placeholder="IBAN"
          className="border p-2 rounded"
        />
 
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Änderungen speichern
</button>
 
      </form>
 
    </main>
 
  );
 
}