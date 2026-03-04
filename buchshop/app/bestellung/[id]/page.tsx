import { cookies } from "next/headers";

import { redirect } from "next/navigation";

import { pool } from "@/lib/db";
 
export default async function BestellungDetail({

  params

}: {

  params: { id: string }

}) {
 
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id");
 
  if (!userId) {

    redirect("/login");

  }
 
  const bestellId = params.id;
 
  const result = await pool.query(
 
    `SELECT

      b.bestell_id,

      b.bestelldatum,

      b.status,

      bp.menge,

      bp.einzelpreis,

      bu.titel

    FROM bestellung b

    JOIN bestellposition bp

      ON b.bestell_id = bp.bestell_id

    JOIN buch bu

      ON bp.buch_id = bu.buch_id

    WHERE b.bestell_id = $1

    AND b.kunden_id = $2`,
 
    [bestellId, userId.value]
 
  );
 
  const items = result.rows;
 
  if (items.length === 0) {

    return <p>Bestellung nicht gefunden.</p>;

  }
 
  const datum = new Date(items[0].bestelldatum).toLocaleDateString();

  const status = items[0].status;
 
  const gesamt = items.reduce(

    (sum, i) => sum + i.menge * i.einzelpreis,

    0

  );
 
  return (
 
    <main className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
 
      <h1 className="text-xl font-bold mb-4">

        Bestellung #{bestellId}
</h1>
 
      <p className="text-gray-600 mb-4">

        Datum: {datum}
</p>
 
      <p className="text-gray-600 mb-6">

        Status: {status}
</p>
 
      <div className="space-y-3">
 
        {items.map((item:any, i:number)=>(
<div

            key={i}

            className="flex justify-between border-b pb-2"
>
 
            <div>

              {item.titel}
<div className="text-sm text-gray-500">

                Menge: {item.menge}
</div>
</div>
 
            <div>

              {(item.menge * item.einzelpreis).toFixed(2)} €
</div>
 
          </div>
 
        ))}
 
      </div>
 
      <div className="mt-6 text-right font-bold text-lg">
 
        Gesamt: {gesamt.toFixed(2)} €
 
      </div>
 
    </main>
 
  );

}
 