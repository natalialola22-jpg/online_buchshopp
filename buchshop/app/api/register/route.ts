import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
 
export async function POST(req: Request) {
 
  const body = await req.json();
 
  const {
    vorname,
    nachname,
    email,
    passwort,
    strasse,
    hausnummer,
    plz,
    ort,
    iban
  } = body;
 
  try {
 
    const hash = await bcrypt.hash(passwort, 10);
 
    await pool.query(
 
      `INSERT INTO kunde
      (
        kunden_vorname,
        kunden_nachname,
        email,
        passwort_hash,
        strasse,
        hausnummer,
        plz,
        ort,
        iban
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
 
      [
        vorname,
        nachname,
        email,
        hash,
        strasse,
        hausnummer,
        plz,
        ort,
        iban
      ]
 
    );
 
    return NextResponse.json({ success: true });
 
  } catch (error) {
 
    console.error(error);
 
    return NextResponse.json(
      { error: "Registrierung fehlgeschlagen" },
      { status: 500 }
    );
 
  }
 
}