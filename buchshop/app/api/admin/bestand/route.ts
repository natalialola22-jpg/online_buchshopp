import { pool } from "@/lib/db";

import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
 
  const body = await req.json();
 
  const { buch_id, menge } = body;
 
  await pool.query(

    `

    UPDATE gedrucktesbuch

    SET bestand_anzahl = bestand_anzahl + $1

    WHERE buch_id = $2

    `,

    [menge, buch_id]

  );
 
  return NextResponse.json({ success: true });
 
}
 