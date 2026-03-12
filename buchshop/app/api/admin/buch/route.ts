import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
 
  try {
 
    const body = await req.json();
 
    console.log("REQUEST BODY:", body);
 
    const {
      titel,
      autor,
      preis,
      isbn,
      sprache,
      verlag,
      erscheinungsdatum,
      beschreibung,
      type,
      bestand
    } = body;
 
    const buch = await pool.query(
 
      `INSERT INTO buch
      (titel, autor, preis, isbn, sprache, verlag, erscheinungsdatum, beschreibung)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING buch_id`,
 
      [
        titel,
        autor,
        parseFloat(preis),
        isbn,
        sprache,
        verlag,
        erscheinungsdatum,
        beschreibung
      ]
 
    );
 
    const buch_id = buch.rows[0].buch_id;
 
    if (type === "print") {
 
      await pool.query(
 
        `INSERT INTO gedrucktesbuch
        (buch_id,bestand_anzahl)
        VALUES ($1,$2)`,
 
        [buch_id, Number(bestand)]
 
      );
 
    }
 
    return NextResponse.json({ success: true });
 
  } catch (error) {
 
    console.error("ADMIN BUCH FEHLER:", error);
 
    return NextResponse.json(
      { error: "Serverfehler beim Hinzufügen des Buches" },
      { status: 500 }
    );
 
  }
 
}