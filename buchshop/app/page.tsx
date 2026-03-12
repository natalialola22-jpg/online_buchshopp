import { pool } from "@/lib/db";
import Link from "next/link";
import AddToCartQuick from "./components/AddToCartQuick";
 
export default async function Home({ searchParams }: any) {
 
  const params = await searchParams;
 
  const q = params?.q || "";
  const type = params?.type || "";
  const available = params?.available === "true";
  const sort = params?.sort || "";
 
  let orderBy = "b.buch_id";
 
  if (sort === "preis_asc") orderBy = "b.preis ASC";
  if (sort === "preis_desc") orderBy = "b.preis DESC";
  if (sort === "titel_asc") orderBy = "b.titel ASC";
  if (sort === "titel_desc") orderBy = "b.titel DESC";
 
const result = await pool.query(
  `
  SELECT
    b.buch_id,
    b.titel,
    b.preis,
    b.autor,
    g.bestand_anzahl
  FROM buch b
  LEFT JOIN gedrucktesbuch g
    ON b.buch_id = g.buch_id
 
  WHERE b.archiviert = FALSE
 
  AND
    ($1 = '' OR LOWER(b.titel) LIKE LOWER('%' || $1 || '%'))
 
  AND
    ($2 = ''
      OR ($2 = 'ebook' AND g.bestand_anzahl IS NULL)
      OR ($2 = 'print' AND g.bestand_anzahl IS NOT NULL)
    )
 
  AND
    ($3 = false OR g.bestand_anzahl > 0 OR g.bestand_anzahl IS NULL)
 
  ORDER BY ${orderBy}
  `,
  [q, type, available]
);
  const buecher = result.rows;
 
  return (
<main className="min-h-screen p-10 bg-green-50">
 
      {/* Titel */}
<h1 className="text-3xl font-bold mb-8 text-green-800 flex items-center gap-3">
        🍀 LuckyLeaf Buchshop
</h1>
 
      {/* Suche + Filter */}
<form method="GET" className="mb-10 flex gap-4 flex-wrap bg-green-100 border border-green-200 p-4 rounded-xl shadow-sm">
 
        <input
          name="q"
          defaultValue={q}
          placeholder="Buchtitel suchen..."
          className="border border-green-400 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
 
        <select
          name="type"
          defaultValue={type}
          className="appearance-none border border-green-400 bg-white text-green-900 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
>
<option value="">Alle</option>
<option value="ebook">E-Book</option>
<option value="print">Gedrucktes Buch</option>
</select>
 
        <label className="flex items-center gap-2 text-green-900 font-medium">
<input
            type="checkbox"
            name="available"
            value="true"
            defaultChecked={available}
            className="accent-green-600"
          />
          Nur verfügbar
</label>
 
        <select
          name="sort"
          defaultValue={sort}
          className="appearance-none border border-green-400 bg-white text-green-900 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
>
<option value="">Standard</option>
<option value="preis_asc">Preis ↑</option>
<option value="preis_desc">Preis ↓</option>
<option value="titel_asc">Titel A-Z</option>
<option value="titel_desc">Titel Z-A</option>
</select>
 
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
          Suchen
</button>
 
      </form>
 
      {/* Bücher Grid */}
<div className="grid grid-cols-3 gap-8">
 
        {buecher.map((buch: any) => {
 
          const isEbook = buch.bestand_anzahl === null;
 
          let lagerAnzeige = "";
 
          if (!isEbook) {
            if (buch.bestand_anzahl > 10) {
              lagerAnzeige = "10+";
            } else {
              lagerAnzeige = buch.bestand_anzahl;
            }
          }
 
          return (
<div
              key={buch.buch_id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:border-green-400 border border-transparent transition flex flex-col"
>
 
              <Link href={`/produkt/${buch.buch_id}`}>
 
                <img
                  src={`https://placehold.co/300x400/16A34A/ffffff?text=${encodeURIComponent(buch.titel)}`}
                  alt={buch.titel}
                  className="w-full h-56 object-cover rounded mb-4"
                />
 
                <h2 className="text-lg font-semibold mb-1">
                  {buch.titel}
</h2>
 
                <p className="text-sm text-gray-500 mb-2">
                  {buch.autor}
</p>
 
                <p className="text-green-700 font-semibold mb-1">
                  {buch.preis} €
</p>
 
                <p className="text-sm text-gray-500 mb-3">
                  {isEbook
                    ? "📱 E-Book"
                    : `📚 Gedrucktes Buch · Noch ${lagerAnzeige} auf Lager`}
</p>
 
              </Link>
 
              {/* Direkt zum Warenkorb */}
<AddToCartQuick buch={buch} />
 
            </div>
          );
        })}
 
      </div>
 
    </main>
  );
}