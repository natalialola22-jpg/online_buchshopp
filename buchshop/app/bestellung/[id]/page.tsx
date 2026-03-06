import { pool } from "@/lib/db";
import Link from "next/link";
 
export default async function BestellungDetail({ params }: any) {
 
  const { id } = await params;
  const bestellId = Number(id);
 
  const result = await pool.query(
    `
    SELECT 
      b.titel,
      bp.menge,
      bp.einzelpreis,
      (bp.menge * bp.einzelpreis) AS gesamtpreis
    FROM bestellposition bp
    JOIN buch b
      ON bp.buch_id = b.buch_id
    WHERE bp.bestell_id = $1
    `,
    [bestellId]
  );
 
  if (result.rows.length === 0) {
    return (
<main className="p-10">
<p>Bestellung nicht gefunden.</p>
<Link href="/konto" className="text-blue-600 underline">
          Zurück zum Konto
</Link>
</main>
    );
  }
 
  const positionen = result.rows;
 
  const gesamtpreis = positionen.reduce(
    (sum: number, p: any) => sum + Number(p.gesamtpreis),
    0
  );
 
  return (
<main className="max-w-3xl mx-auto p-10">
 
      <h1 className="text-2xl font-bold mb-6">
        Bestellung #{bestellId}
</h1>
 
      <div className="bg-white p-6 rounded shadow">
 
        {positionen.map((p: any, i: number) => (
<div key={i} className="flex justify-between border-b py-3">
 
            <div>
<p className="font-semibold">{p.titel}</p>
<p className="text-sm text-gray-500">
                {p.menge} × {p.einzelpreis} €
</p>
</div>
 
            <p className="font-semibold">
              {p.gesamtpreis} €
</p>
 
          </div>
        ))}
 
        <div className="flex justify-between mt-6 text-lg font-bold">
<span>Gesamt</span>
<span>{gesamtpreis.toFixed(2)} €</span>
</div>
 
      </div>
 
      <Link
        href="/konto"
        className="inline-block mt-6 text-blue-600 underline"
>
        Zurück zum Konto
</Link>
 
    </main>
  );
}