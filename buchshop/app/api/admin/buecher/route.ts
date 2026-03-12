import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
 
export async function GET(req: Request) {
 
  const { searchParams } = new URL(req.url);
 
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "";
 
  let orderBy = "b.titel ASC";
 
  if (sort === "bestand_asc") orderBy = "g.bestand_anzahl ASC";
  if (sort === "bestand_desc") orderBy = "g.bestand_anzahl DESC";
 
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
    ORDER BY ${orderBy}
    `,
    [q]
  );
 
  return NextResponse.json(result.rows);
 
}