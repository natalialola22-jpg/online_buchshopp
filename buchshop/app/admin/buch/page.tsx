"use client";
 
import { useState } from "react";
 
export default function NeuesBuch() {
 
  const [titel,setTitel] = useState("");
  const [autor,setAutor] = useState("");
  const [preis,setPreis] = useState("");
 
  const [isbn,setIsbn] = useState("");
  const [sprache,setSprache] = useState("");
  const [verlag,setVerlag] = useState("");
  const [erscheinungsdatum,setDatum] = useState("");
  const [beschreibung,setBeschreibung] = useState("");
 
  const [type,setType] = useState("ebook");
  const [bestand,setBestand] = useState("");
 
  async function handleSubmit(e:any){
 
    e.preventDefault();
 
    const res = await fetch("/api/admin/buch",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        titel,
        autor,
        preis,
        isbn,
        sprache,
        verlag,
        erscheinungsdatum,
        beschreibung,
        type,
        bestand
      })
    });
 
    if(res.ok){
      alert("Buch hinzugefügt");
      window.location.reload();
    }else{
      alert("Fehler beim Hinzufügen");
    }
 
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Neues Buch hinzufügen
</h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
        placeholder="Titel"
        value={titel}
        onChange={(e)=>setTitel(e.target.value)}
        className="border p-2 rounded"
        />
 
        <input
        placeholder="Autor"
        value={autor}
        onChange={(e)=>setAutor(e.target.value)}
        className="border p-2 rounded"
        />
 
        <input
type="number"
step="0.01"
placeholder="Preis"
value={preis}
onChange={(e)=>setPreis(e.target.value)}
className="border p-2 rounded"
/>
 
        <input
        placeholder="ISBN"
        value={isbn}
        onChange={(e)=>setIsbn(e.target.value)}
        className="border p-2 rounded"
        />
 
        <input
        placeholder="Sprache"
        value={sprache}
        onChange={(e)=>setSprache(e.target.value)}
        className="border p-2 rounded"
        />
 
        <input
        placeholder="Verlag"
        value={verlag}
        onChange={(e)=>setVerlag(e.target.value)}
        className="border p-2 rounded"
        />
 
        <input
        type="date"
        value={erscheinungsdatum}
        onChange={(e)=>setDatum(e.target.value)}
        className="border p-2 rounded"
        />
 
        <textarea
        placeholder="Beschreibung"
        value={beschreibung}
        onChange={(e)=>setBeschreibung(e.target.value)}
        className="border p-2 rounded"
        />
 
        <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        className="border p-2 rounded"
>
 
          <option value="ebook">E-Book</option>
<option value="print">Gedrucktes Buch</option>
 
        </select>
 
        {type === "print" && (
 
          <input
          placeholder="Lagerbestand"
          value={bestand}
          onChange={(e)=>setBestand(e.target.value)}
          className="border p-2 rounded"
          />
 
        )}
 
        <button className="bg-green-600 text-white py-2 rounded">
          Buch speichern
</button>
 
      </form>
 
    </main>
 
  );
 
}