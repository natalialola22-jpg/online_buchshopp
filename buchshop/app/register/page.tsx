"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function Register() {
  const router = useRouter();
 
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [adresse, setAdresse] = useState("");
 
  async function handleRegister() {
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
        adresse,
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
<main className="p-10 max-w-md">
<h1 className="text-2xl font-bold mb-6">
        Registrierung
</h1>
 
      <input
        placeholder="Vorname"
        className="border p-2 w-full mb-3"
        value={vorname}
        onChange={(e) => setVorname(e.target.value)}
      />
 
      <input
        placeholder="Nachname"
        className="border p-2 w-full mb-3"
        value={nachname}
        onChange={(e) => setNachname(e.target.value)}
      />
 
      <input
        placeholder="E-Mail"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
 
      <input
        type="password"
        placeholder="Passwort"
        className="border p-2 w-full mb-3"
        value={passwort}
        onChange={(e) => setPasswort(e.target.value)}
      />
 
      <textarea
        placeholder="Adresse"
        className="border p-2 w-full mb-4"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />
 
      <button
        onClick={handleRegister}
        className="bg-black text-white px-6 py-2 rounded"
>
        Registrieren
</button>
</main>
  );
}