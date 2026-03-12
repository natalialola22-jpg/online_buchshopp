  import { pool } from "@/lib/db";
import Link from "next/link";
 
export default async function AdminBuecher({ searchParams }: any) {
 
  const params = await searchParams;
 
  const q = params?.q || "";
  const sort = params?.sort || "";
  const archiv = params?.archiv || "active";
 
  let orderBy = "b.titel ASC";
 
  if (sort === "bestand_asc") orderBy = "g.bestand_anzahl ASC";
  if (sort === "bestand_desc") orderBy = "g.bestand_anzahl DESC";
 
  let archivFilter = "";
 
  if (archiv === "active") {
    archivFilter = "AND b.archiviert = false";
  }
 
  if (archiv === "archived") {
    archivFilter = "AND b.archiviert = true";
  }
 
  const result = await pool.query(
    `
    SELECT
      b.buch_id,
      b.titel,
      b.preis,
      b.archiviert,
      g.bestand_anzahl
    FROM buch b
    LEFT JOIN gedrucktesbuch g
      ON b.buch_id = g.buch_id
 
    WHERE
      ($1 = '' OR LOWER(b.titel) LIKE LOWER('%' || $1 || '%'))
      ${archivFilter}
 
    ORDER BY ${orderBy}
    `,
    [q]
  );
 
  const buecher = result.rows;
 
  return (
<main className="max-w-5xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Bücher verwalten
</h1>
 
      {/* Suche + Sortierung */}
 
      <form method="GET" className="flex gap-4 mb-6">
 
        <input
          name="q"
          defaultValue={q}
          placeholder="Buch suchen..."
          className="border p-2 rounded w-64"
        />
 
        <select
          name="archiv"
          defaultValue={archiv}
          className="border p-2 rounded"
>
<option value="active">Aktiv</option>
<option value="archived">Archiviert</option>
<option value="all">Alle</option>
</select>
 
        <select
          name="sort"
          defaultValue={sort}
          className="border p-2 rounded"
>
<option value="">Sortierung</option>
<option value="bestand_asc">Bestand ↑</option>
<option value="bestand_desc">Bestand ↓</option>
</select>
 
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Suchen
</button>
 
      </form>
 
      <div className="bg-white rounded shadow">
 
        <table className="w-full">
 
          <thead className="bg-green-50">
<tr>
<th className="p-3 text-left">Titel</th>
<th className="p-3 text-left">Preis</th>
<th className="p-3 text-left">Bestand</th>
<th className="p-3 text-left">Aktion</th>
</tr>
</thead>
 
          <tbody>
 
            {buecher.map((b: any) => (
 
              <tr key={b.buch_id} className="border-t">
 
                <td className="p-3">
 
                  {b.titel}
 
                  {b.archiviert && (
<span className="text-red-600 ml-2 font-medium">
                      (archiviert)
</span>
                  )}
 
                </td>
 
                <td className="p-3">
                  {b.preis} €
</td>
 
                <td className="p-3">
 
                  {b.bestand_anzahl === null
                    ? "E-Book"
                    : `${b.bestand_anzahl} Stück`
                  }
 
                </td>
 
                <td className="p-3">
 
                  <Link
                    href={`/admin/buch/${b.buch_id}`}
                    className="text-green-700 font-medium hover:underline"
>
                    Bearbeiten
</Link>
 
                </td>
 
              </tr>
 
            ))}
 
          </tbody>
 
        </table>
 
      </div>
 
    </main>
  );
}