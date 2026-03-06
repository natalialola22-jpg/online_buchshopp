import { pool } from "@/lib/db";
import AddToCartButton from "./AddToCartButton";
 
export default async function ProduktPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 
  const { id } = await params;
 
  const result = await pool.query(
    `
    SELECT
      b.buch_id,
      b.titel,
      b.autor,
      b.preis,
      b.beschreibung,
      g.bestand_anzahl
    FROM buch b
    LEFT JOIN gedrucktesbuch g
      ON b.buch_id = g.buch_id
    WHERE b.buch_id = $1
    `,
    [id]
  );
 
  const produkt = result.rows[0];
 
  const isEbook = produkt.bestand_anzahl === null;
 
  return (
<main className="min-h-screen p-10 bg-green-50">
 
      <div className="bg-white p-8 rounded-xl shadow max-w-xl">
 <img
  src={`https://placehold.co/400x500/16A34A/ffffff?text=${encodeURIComponent(produkt.titel)}`}
  alt={produkt.titel}
  className="w-full max-w-xs rounded mb-6"
/>
        <h1 className="text-2xl font-bold mb-1">
          {produkt.titel}
</h1>
 
        <p className="text-gray-500 mb-4">
          von {produkt.autor}
</p>
 
        <p className="text-lg font-semibold mb-4">
          Preis: {produkt.preis} €
</p>
 
        <p className="text-sm text-gray-500 mb-6">
          {isEbook
            ? "E-Book"
            : `Gedrucktes Buch · Noch ${produkt.bestand_anzahl} auf Lager`}
</p>
 
        {/* Beschreibung */}
 
        <div className="mb-6">
 
          <h2 className="font-semibold mb-2">
            Beschreibung
</h2>
 
          <p className="text-gray-700 leading-relaxed">
            {produkt.beschreibung}
</p>
 
        </div>
 
        <AddToCartButton produkt={produkt} />
 
      </div>
 
    </main>
  );
}