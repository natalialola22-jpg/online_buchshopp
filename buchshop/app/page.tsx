import { pool } from "@/lib/db";

import Link from "next/link";
 
export default async function Home() {

  const result = await pool.query(

    "SELECT buch_id, titel, preis FROM buch ORDER BY buch_id;"

  );
 
  const buecher = result.rows;
 
  return (
<main className="min-h-screen p-10 bg-gray-100">
<h1 className="text-3xl font-bold mb-8">

        Online Buchshop
</h1>
 
      <div className="grid grid-cols-3 gap-6">

        {buecher.map((buch: any) => (
<Link

            key={buch.buch_id}

            href={`/produkt/${buch.buch_id}`}

            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
>
<h2 className="text-lg font-semibold mb-2">

              {buch.titel}
</h2>
<p className="text-gray-600">

              {buch.preis} €
</p>
</Link>

        ))}
</div>
</main>

  );

}
 