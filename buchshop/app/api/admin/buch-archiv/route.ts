import { pool } from "@/lib/db";

import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
 
  const body = await req.json();
 
  await pool.query(

    `

    UPDATE buch

    SET archiviert = $1

    WHERE buch_id = $2

    `,

    [body.archiviert, body.buch_id]

  );
 
  return NextResponse.json({ success: true });
 
}
 