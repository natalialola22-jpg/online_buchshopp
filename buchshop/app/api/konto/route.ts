import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

import { cookies } from "next/headers";
 
export async function POST(req:Request){
 
  const body = await req.json();
 
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id");
 
  if(!userId){
 
    return NextResponse.json(

      {error:"Nicht eingeloggt"},

      {status:401}

    );
 
  }
 
  await pool.query(
 
    `UPDATE kunde

     SET kunden_vorname = $1,

         kunden_nachname = $2,

         adresse = $3,

         iban = $4

     WHERE kunden_id = $5`,
 
    [

      body.vorname,

      body.nachname,

      body.adresse,

      body.iban,

      userId.value

    ]
 
  );
 
  return NextResponse.json({success:true});
 
}
 