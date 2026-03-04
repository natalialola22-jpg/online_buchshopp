"use client";
 
import { useState } from "react";
 
export default function LoginPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
 
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        passwort: password
      }),
    });
 
    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Login fehlgeschlagen");
    }
  }
 
  return (
<main className="max-w-md mx-auto bg-white p-6 rounded shadow">
 
      <h1 className="text-xl font-bold mb-4">
        Login
</h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
 
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
 
        <button
          type="submit"
          className="bg-black text-white py-2 rounded"
>
          Einloggen
</button>
 
      </form>
 
    </main>
  );
}