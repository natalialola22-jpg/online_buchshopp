import { pool } from "@/lib/db";
import Link from "next/link";
 
export default async function Home() {
 
  const result = await pool.query(`
 
    SELECT
      b.buch_id,
      b.titel,
      b.preis,
 
      CASE
        WHEN e.buch_id IS NOT NULL THEN 'Ebook'
        WHEN g.buch_id IS NOT NULL THEN 'Gedrucktes Buch'
      END AS format,
 
      g.bestand_anzahl
 
    FROM buch b
 
    LEFT JOIN ebook e
      ON b.buch_id = e.buch_id
 
    LEFT JOIN gedrucktesbuch g
      ON b.buch_id = g.buch_id
 
    ORDER BY b.buch_id;
 
  `);
 
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
 
            <p className="text-gray-600 mb-2">
              {buch.preis} €
</p>
 
            {/* Format */}
 
            <p className="text-sm text-gray-500">
              {buch.format}
</p>
 
            {/* Verfügbarkeit */}
 
            {buch.format === "Ebook" && (
<p className="text-green-600 text-sm mt-1">
                Sofort verfügbar
</p>
            )}
 
            {buch.format === "Gedrucktes Buch" && (
<>
                {buch.bestand_anzahl > 5 && (
<p className="text-green-600 text-sm mt-1">
                    Auf Lager
</p>
                )}
 
                {buch.bestand_anzahl > 0 && buch.bestand_anzahl <= 5 && (
<p className="text-orange-600 text-sm mt-1">
                    Nur noch {buch.bestand_anzahl} verfügbar
</p>
                )}
 
                {buch.bestand_anzahl === 0 && (
<p className="text-red-600 text-sm mt-1">
                    Nicht verfügbar
</p>
                )}
</>
            )}
 
          </Link>
 
        ))}
 
      </div>
 
    </main>
 
  );
}