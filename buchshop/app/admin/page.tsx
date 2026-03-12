import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import Link from "next/link";
 
import SalesChart from "./SalesChart";
import BestsellerToggle from "./BestsellerToggle";
 
export default async function AdminPage({ searchParams }: any) {
 
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
 
  if (!userId) redirect("/login");
 
  const adminCheck = await pool.query(
    `SELECT is_admin FROM kunde WHERE kunden_id = $1`,
    [userId.value]
  );
 
  if (!adminCheck.rows[0]?.is_admin) {
    redirect("/");
  }
 
  const params = await searchParams;
  const range = params?.range || "month";
 
  let interval = "30 days";
 
  if (range === "day") interval = "1 day";
  if (range === "week") interval = "7 days";
  if (range === "month") interval = "30 days";
  if (range === "year") interval = "1 year";
 
  const stats = await pool.query(`
    SELECT
      COUNT(DISTINCT b.bestell_id) AS bestellungen,
      SUM(bp.menge * bp.einzelpreis) AS umsatz,
      SUM(bp.menge) AS verkaufte_buecher
    FROM bestellung b
    JOIN bestellposition bp
      ON b.bestell_id = bp.bestell_id
    WHERE b.bestelldatum >= NOW() - INTERVAL '${interval}'
  `);
 
  let chartQuery = "";
 
  if (range === "day") {
    chartQuery = `
      SELECT
        EXTRACT(HOUR FROM b.bestelldatum) AS label,
        SUM(bp.menge) AS verkauft
      FROM bestellung b
      JOIN bestellposition bp
        ON b.bestell_id = bp.bestell_id
      WHERE b.bestelldatum >= NOW() - INTERVAL '1 day'
      GROUP BY label
      ORDER BY label
    `;
  }
 
  if (range === "week") {
    chartQuery = `
      SELECT
        DATE(b.bestelldatum) AS label,
        SUM(bp.menge) AS verkauft
      FROM bestellung b
      JOIN bestellposition bp
        ON b.bestell_id = bp.bestell_id
      WHERE b.bestelldatum >= NOW() - INTERVAL '7 days'
      GROUP BY label
      ORDER BY label
    `;
  }
 
  if (range === "month") {
    chartQuery = `
      SELECT
        CEIL(EXTRACT(DAY FROM NOW() - b.bestelldatum) / 7) AS label,
        SUM(bp.menge) AS verkauft
      FROM bestellung b
      JOIN bestellposition bp
        ON b.bestell_id = bp.bestell_id
      WHERE b.bestelldatum >= NOW() - INTERVAL '30 days'
      GROUP BY label
      ORDER BY label
    `;
  }
 
  if (range === "year") {
    chartQuery = `
      SELECT
        TO_CHAR(b.bestelldatum, 'YYYY-MM') AS label,
        SUM(bp.menge) AS verkauft
      FROM bestellung b
      JOIN bestellposition bp
        ON b.bestell_id = bp.bestell_id
      WHERE b.bestelldatum >= NOW() - INTERVAL '1 year'
      GROUP BY label
      ORDER BY label
    `;
  }
 
  const chartData = await pool.query(chartQuery);
 
  const bestseller = await pool.query(`
    SELECT
      buch.titel,
      SUM(bp.menge) AS verkauft
    FROM bestellposition bp
    JOIN buch
      ON bp.buch_id = buch.buch_id
    GROUP BY buch.titel
    ORDER BY verkauft DESC
    LIMIT 5
  `);
 
  /* 🔴 NEU: Lagerwarnung */
  const lowStock = await pool.query(`
    SELECT
      b.buch_id,
      b.titel,
      g.bestand_anzahl
    FROM buch b
    JOIN gedrucktesbuch g
      ON b.buch_id = g.buch_id
    WHERE g.bestand_anzahl < 10
    AND b.archiviert = false
    ORDER BY g.bestand_anzahl ASC
  `);
 
  const s = stats.rows[0];
 
  return (
 
<main className="max-w-5xl mx-auto p-10 space-y-8">
 
      <h1 className="text-3xl font-bold text-green-700">
        🍀 Admin Dashboard
</h1>
 
      <form method="GET" className="flex gap-4">
 
        <select
          name="range"
          defaultValue={range}
          className="border p-2 rounded"
>
<option value="day">Letzte 24h</option>
<option value="week">Letzte Woche</option>
<option value="month">Letzter Monat</option>
<option value="year">Letztes Jahr</option>
</select>
 
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Anzeigen
</button>
 
      </form>
 
      <div className="grid grid-cols-3 gap-6">
 
        <div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Bestellungen</p>
<p className="text-2xl font-bold">
{s.bestellungen || 0}
</p>
</div>
 
        <div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Umsatz</p>
<p className="text-2xl font-bold">
{Number(s.umsatz || 0).toFixed(2)} €
</p>
</div>
 
        <div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Verkaufte Bücher</p>
<p className="text-2xl font-bold">
{s.verkaufte_buecher || 0}
</p>
</div>
 
      </div>
 
      {/* 🔴 WARNUNG BEI NIEDRIGEM LAGERBESTAND */}
 
      {lowStock.rows.length > 0 && (
 
<div className="bg-orange-50 border border-orange-300 p-6 rounded shadow">
 
<h2 className="text-xl font-bold text-orange-700 mb-3">
⚠ Niedriger Lagerbestand
</h2>
 
<div className="flex flex-col gap-2">
 
{lowStock.rows.map((b:any)=>(
<div key={b.buch_id} className="flex justify-between">
 
<span>{b.titel}</span>
 
<span className="text-orange-700 font-semibold">
{b.bestand_anzahl} Stück
</span>
 
</div>
))}
 
</div>
 
</div>
 
)}
 
      <SalesChart data={chartData.rows} range={range} />
 
      <BestsellerToggle data={bestseller.rows} />
 
      <div className="flex gap-4">
 
<Link
href="/admin/buch"
className="inline-block bg-green-600 text-white px-6 py-3 rounded"
>
Neues Buch hinzufügen
</Link>
 
<Link
href="/admin/buecher"
className="inline-block bg-white border border-green-600 text-green-700 px-6 py-3 rounded"
>
Bücher verwalten
</Link>
 
</div>
 
</main>
 
  );
 
}