import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
 
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
 
  try {
    const result = await pool.query(
      "SELECT * FROM buch WHERE buch_id = $1",
      [id]
    );
 
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}