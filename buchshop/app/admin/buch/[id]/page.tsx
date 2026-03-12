import { pool } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import BuchForm from "./BuchForm";
 
export default async function EditBuch({ params }: any) {
 
  const { id } = await params;
 
  const result = await pool.query(`
    SELECT
      b.*,
      g.bestand_anzahl
    FROM buch b
    LEFT JOIN gedrucktesbuch g
      ON b.buch_id = g.buch_id
    WHERE b.buch_id = $1
  `,[id]);
 
  const buch = result.rows[0];
 
  if(!buch){
    redirect("/admin/buecher");
  }
 
  return (
 
<main className="max-w-3xl mx-auto p-10">
 
<h1 className="text-3xl font-bold text-green-700 mb-6">
Buch bearbeiten
</h1>
 
<BuchForm buch={buch}/>
 
<div className="mt-6">
<Link
href="/admin/buecher"
className="text-green-700"
>
← Zurück zur Übersicht
</Link>
</div>
 
</main>
 
  );
}