"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function Register() {
 
  const router = useRouter();
 
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
 
  const [strasse, setStrasse] = useState("");
  const [hausnummer, setHausnummer] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
 
  const [iban, setIban] = useState("");
 
  async function handleRegister() {
 
    // IBAN prüfen (optional aber wenn vorhanden → Länge 22)
    if (iban && iban.length !== 22) {
      alert("IBAN muss 22 Zeichen lang sein");
      return;
    }
 
    const res = await fetch("/api/register", {
 
      method: "POST",
 
      headers: {
        "Content-Type": "application/json",
      },
 
      body: JSON.stringify({
        vorname,
        nachname,
        email,
        passwort,
        strasse,
        hausnummer,
        plz,
        ort,
        iban
      }),
 
    });
 
    if (res.ok) {
 
      alert("Registrierung erfolgreich");
 
      router.push("/login");
 
    } else {
 
      alert("Fehler bei Registrierung");
 
    }
 
  }
 
  return (
 
    <main className="p-10 max-w-md mx-auto bg-white rounded shadow">
 
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Registrierung
</h1>
 
      <input
        placeholder="Vorname"
        className="border p-2 w-full mb-3 rounded"
        value={vorname}
        onChange={(e) => setVorname(e.target.value)}
      />
 
      <input
        placeholder="Nachname"
        className="border p-2 w-full mb-3 rounded"
        value={nachname}
        onChange={(e) => setNachname(e.target.value)}
      />
 
      <input
        placeholder="E-Mail"
        className="border p-2 w-full mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
 
      <input
        type="password"
        placeholder="Passwort"
        className="border p-2 w-full mb-3 rounded"
        value={passwort}
        onChange={(e) => setPasswort(e.target.value)}
      />
 
      <input
        placeholder="Straße"
        className="border p-2 w-full mb-3 rounded"
        value={strasse}
        onChange={(e) => setStrasse(e.target.value)}
      />
 
      <input
        placeholder="Hausnummer"
        className="border p-2 w-full mb-3 rounded"
        value={hausnummer}
        onChange={(e) => setHausnummer(e.target.value)}
      />
 
      <input
        placeholder="PLZ"
        className="border p-2 w-full mb-3 rounded"
        value={plz}
        onChange={(e) => setPlz(e.target.value)}
      />
 
      <input
        placeholder="Ort"
        className="border p-2 w-full mb-3 rounded"
        value={ort}
        onChange={(e) => setOrt(e.target.value)}
      />
 
      <input
        placeholder="IBAN (optional)"
        maxLength={22}
        className="border p-2 w-full mb-4 rounded"
        value={iban}
        onChange={(e) => setIban(e.target.value)}
      />
 
      <button
        onClick={handleRegister}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
>
        Registrieren
</button>
 
    </main>
 
  );
 
}