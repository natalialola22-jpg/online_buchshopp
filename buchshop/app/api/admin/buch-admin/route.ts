import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
 
export async function POST(req:Request){
 
  const body = await req.json();
 
  const {
    buch_id,
    titel,
    autor,
    preis,
    isbn,
    sprache,
    verlag,
    erscheinungsdatum,
    beschreibung,
    bestand
  } = body;
 
  await pool.query(`
    UPDATE buch
    SET
      titel=$1,
      autor=$2,
      preis=$3,
      isbn=$4,
      sprache=$5,
      verlag=$6,
      erscheinungsdatum=$7,
      beschreibung=$8
    WHERE buch_id=$9
  `,[
    titel,
    autor,
    preis,
    isbn,
    sprache,
    verlag,
    erscheinungsdatum,
    beschreibung,
    buch_id
  ]);
 
  if(bestand !== null){
 
    await pool.query(`
      UPDATE gedrucktesbuch
      SET bestand_anzahl=$1
      WHERE buch_id=$2
    `,[bestand,buch_id]);
 
  }
 
  return NextResponse.json({success:true})
 
}