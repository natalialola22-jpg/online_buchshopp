import { NextResponse } from "next/server";

import { pool } from "@/lib/db";
 
export async function POST(req: Request) {

  const body = await req.json();

  const items = body.items;
 
  try {

    const bestellung = await pool.query(

      "INSERT INTO bestellung (kunden_id, status) VALUES (1, 'offen') RETURNING bestell_id"

    );
 
    const bestell_id = bestellung.rows[0].bestell_id;
 
    for (const item of items) {

      await pool.query(

        "INSERT INTO bestellposition (bestell_id, buch_id, menge, einzelpreis) VALUES ($1, $2, $3, $4)",

        [bestell_id, item.buch_id, item.mende, item.preis]

      );

    }
 
    return NextResponse.json({ success: true });

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      { error: "Fehler bei Bestellung" },

      { status: 500 }

    );

  }

}
 