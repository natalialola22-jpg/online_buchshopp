import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";
 
export async function POST(req: Request) {
 
  const body = await req.json();
 
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
 
  if (!userId) {
 
    return NextResponse.json(
      { error: "Nicht eingeloggt" },
      { status: 401 }
    );
 
  }
 
  await pool.query(
 
    `UPDATE kunde
     SET
       kunden_vorname = $1,
       kunden_nachname = $2,
       strasse = $3,
       hausnummer = $4,
       plz = $5,
       ort = $6,
       iban = $7
     WHERE kunden_id = $8`,
 
    [
      body.vorname,
      body.nachname,
      body.strasse,
      body.hausnummer,
      body.plz,
      body.ort,
      body.iban,
      userId.value
    ]
 
  );
 
  return NextResponse.json({ success: true });
 
}