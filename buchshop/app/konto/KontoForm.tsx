"use client";
 
import { useState } from "react";
 
export default function KontoForm({ kunde }: any) {
 
  const [vorname, setVorname] = useState(kunde.kunden_vorname);
  const [nachname, setNachname] = useState(kunde.kunden_nachname);
  const [adresse, setAdresse] = useState(kunde.adresse || "");
  const [iban, setIban] = useState(kunde.iban || "");
 
  async function handleSubmit(e:any) {
 
    e.preventDefault();
 
    const res = await fetch("/api/konto", {
 
      method: "POST",
 
      headers: {
        "Content-Type": "application/json"
      },
 
      body: JSON.stringify({
        vorname,
        nachname,
        adresse,
        iban
      })
 
    });
 
    if(res.ok){
 
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
          onChange={(e)=>setVorname(e.target.value)}
          placeholder="Vorname"
          className="border p-2 rounded"
        />
 
        <input
          value={nachname}
          onChange={(e)=>setNachname(e.target.value)}
          placeholder="Nachname"
          className="border p-2 rounded"
        />
 
        <input
          value={adresse}
          onChange={(e)=>setAdresse(e.target.value)}
          placeholder="Adresse"
          className="border p-2 rounded"
        />
 
        <input
          value={iban}
          onChange={(e)=>setIban(e.target.value)}
          placeholder="IBAN"
          className="border p-2 rounded"
        />
 
        <button className="bg-black text-white py-2 rounded">
          Änderungen speichern
</button>
 
      </form>
 
    </main>
 
  );
}