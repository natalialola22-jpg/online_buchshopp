import { cookies } from "next/headers";

import { redirect } from "next/navigation";

import { pool } from "@/lib/db";

import Link from "next/link";

import KontoForm from "./KontoForm";
 
export default async function KontoPage() {
 
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id");
 
  if (!userId) {

    redirect("/login");

  }
 
  // Kundendaten laden

  const kundeResult = await pool.query(

    `SELECT

      kunden_vorname,

      kunden_nachname,

      email,

      adresse,

      iban

     FROM kunde

     WHERE kunden_id = $1`,

    [userId.value]

  );
 
  const kunde = kundeResult.rows[0];
 
  // Bestellungen laden

  const bestellungenResult = await pool.query(

    `SELECT

      b.bestell_id,

      b.bestelldatum,

      b.status,

      SUM(bp.menge * bp.einzelpreis) AS gesamtpreis

     FROM bestellung b

     JOIN bestellposition bp

       ON b.bestell_id = bp.bestell_id

     WHERE b.kunden_id = $1

     GROUP BY b.bestell_id

     ORDER BY b.bestelldatum DESC`,

    [userId.value]

  );
 
  const bestellungen = bestellungenResult.rows;
 
  return (
 
    <main className="max-w-3xl mx-auto space-y-10">
 
      {/* Kontodaten */}
<KontoForm kunde={kunde} />
 
      {/* Bestellhistorie */}
 
      <div className="bg-white p-6 rounded shadow">
 
        <h2 className="text-xl font-bold mb-4">

          Bestellhistorie
</h2>
 
        {bestellungen.length === 0 && (
<p>Du hast noch keine Bestellungen.</p>

        )}
 
        {bestellungen.map((b:any) => (
 
          <Link

            key={b.bestell_id}

            href={`/bestellung/${b.bestell_id}`}

            className="block border p-4 rounded mb-3 hover:bg-gray-50"
>
 
            <div className="flex justify-between">
 
              <span>

                Bestellung #{b.bestell_id}
</span>
 
              <span>

                {new Date(b.bestelldatum).toLocaleDateString()}
</span>
 
            </div>
 
            <div className="text-sm text-gray-600 mt-2">

              Status: {b.status}
</div>
 
            <div className="font-semibold mt-2">

              Gesamtpreis: {Number(b.gesamtpreis).toFixed(2)} €
</div>
 
          </Link>
 
        ))}
 
      </div>
 
    </main>
 
  );

}
 