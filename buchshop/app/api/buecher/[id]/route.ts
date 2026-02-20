import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
 
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT buch_id, titel, preis FROM buch ORDER BY buch_id;"
    );
 
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}