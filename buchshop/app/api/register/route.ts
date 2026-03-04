import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

import bcrypt from "bcrypt";
 
export async function POST(req: Request) {

  const body = await req.json();

  const { vorname, nachname, email, passwort, adresse, iban } = body;
 
  try {

    const hash = await bcrypt.hash(passwort, 10);
 
    const result = await pool.query(

      `INSERT INTO kunde 

      (kunden_vorname, kunden_nachname, email, passwort_hash, adresse, iban)

      VALUES ($1, $2, $3, $4, $5, $6)

      RETURNING kunden_id`,

      [vorname, nachname, email, hash, adresse, iban]

    );
 
    return NextResponse.json({ success: true });

  } catch (error) {

    return NextResponse.json(

      { error: "Registrierung fehlgeschlagen" },

      { status: 500 }

    );

  }

}
 