import { pool } from "@/lib/db";
 
export default async function ProduktPage({

  params,

}: {

  params: Promise<{ id: string }>;

}) {

  const { id } = await params;
 
  const result = await pool.query(

    "SELECT * FROM buch WHERE buch_id = $1",

    [id]

  );
 
  const produkt = result.rows[0];
 
  return (
<main className="min-h-screen p-10 bg-gray-100">
<div className="bg-white p-8 rounded-xl shadow max-w-xl">
<h1 className="text-2xl font-bold mb-4">

          {produkt.titel}
</h1>
 
        <p className="mb-4">

          Preis: {produkt.preis} €
</p>
 
        <button className="bg-black text-white px-6 py-2 rounded">

          In den Warenkorb
</button>
</div>
</main>

  );

}
 