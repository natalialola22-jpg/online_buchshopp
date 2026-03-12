"use client";
 
import { useState } from "react";
 
export default function BuchForm({ buch }: any) {
 
  const [titel,setTitel] = useState(buch.titel);
  const [autor,setAutor] = useState(buch.autor);
  const [preis,setPreis] = useState(buch.preis);
 
  const [isbn,setIsbn] = useState(buch.isbn || "");
  const [sprache,setSprache] = useState(buch.sprache || "");
  const [verlag,setVerlag] = useState(buch.verlag || "");
 
  const [datum,setDatum] = useState(
    buch.erscheinungsdatum
      ? new Date(buch.erscheinungsdatum).toISOString().split("T")[0]
      : ""
  );
 
  const [beschreibung,setBeschreibung] = useState(buch.beschreibung || "");
  const [bestand,setBestand] = useState(buch.bestand_anzahl);
 
  const [archiviert,setArchiviert] = useState(buch.archiviert);
 
  async function speichern(){
 
    const res = await fetch("/api/admin/buch-update",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        buch_id:buch.buch_id,
        titel,
        autor,
        preis,
        isbn,
        sprache,
        verlag,
        erscheinungsdatum:datum,
        beschreibung,
        bestand
      })
    });
 
    if(res.ok){
 
      alert("Änderungen gespeichert");
 
      window.location.href="/admin/buecher";
 
    }else{
 
      alert("Fehler beim Speichern");
 
    }
 
  }
 
  async function archivieren(){
 
    const res = await fetch("/api/admin/buch-archiv",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        buch_id:buch.buch_id,
        archiviert:!archiviert
      })
    });
 
    if(res.ok){
 
      setArchiviert(!archiviert);
 
    }else{
 
      alert("Fehler beim Archivieren");
 
    }
 
  }
 
  return(
 
<div className="bg-white p-6 rounded shadow flex flex-col gap-4">
 
<input
value={titel}
onChange={(e)=>setTitel(e.target.value)}
className="border p-2 rounded"
placeholder="Titel"
/>
 
<input
value={autor}
onChange={(e)=>setAutor(e.target.value)}
className="border p-2 rounded"
placeholder="Autor"
/>
 
<input
type="number"
step="0.01"
value={preis}
onChange={(e)=>setPreis(e.target.value)}
className="border p-2 rounded"
placeholder="Preis"
/>
 
<input
value={isbn}
onChange={(e)=>setIsbn(e.target.value)}
className="border p-2 rounded"
placeholder="ISBN"
/>
 
<input
value={sprache}
onChange={(e)=>setSprache(e.target.value)}
className="border p-2 rounded"
placeholder="Sprache"
/>
 
<input
value={verlag}
onChange={(e)=>setVerlag(e.target.value)}
className="border p-2 rounded"
placeholder="Verlag"
/>
 
<input
type="date"
value={datum}
onChange={(e)=>setDatum(e.target.value)}
className="border p-2 rounded"
/>
 
<textarea
value={beschreibung}
onChange={(e)=>setBeschreibung(e.target.value)}
className="border p-2 rounded"
placeholder="Beschreibung"
/>
 
{bestand !== null && (
 
<input
type="number"
value={bestand}
onChange={(e)=>setBestand(e.target.value)}
className="border p-2 rounded"
placeholder="Lagerbestand"
/>
 
)}
 
<div className="flex gap-4 mt-4">
 
<button
onClick={speichern}
className="bg-green-600 text-white px-6 py-2 rounded"
>
Speichern
</button>
 
<button
onClick={archivieren}
className={`px-6 py-2 rounded text-white ${
archiviert ? "bg-orange-500" : "bg-red-500"
}`}
>
{archiviert ? "Entarchivieren" : "Archivieren"}
</button>
 
</div>
 
</div>
 
  );
}