import { NextResponse } from "next/server";

import { pool } from "@/lib/db";
 
export async function GET() {
 
  const result = await pool.query(`
 
    SELECT

      b.buch_id,

      b.titel,

      b.preis,
 
      CASE

        WHEN e.buch_id IS NOT NULL THEN 'ebook'

        WHEN g.buch_id IS NOT NULL THEN g.einband

      END AS format,
 
      g.bestand_anzahl
 
    FROM buch b
  
 
    LEFT JOIN ebook e

      ON b.buch_id = e.buch_id
 
    LEFT JOIN gedrucktesbuch g

      ON b.buch_id = g.buch_id

 
  `);
 
  return NextResponse.json(result.rows);
 
}
 