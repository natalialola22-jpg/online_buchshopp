import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";
 
export async function POST(req: Request) {
 
  const body = await req.json();
  const { items, kunde, saveAddress } = body;
 
  try {
 
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id");
 
    let kunden_id;
 
    // 1️⃣ Eingeloggt → existierenden Kunden verwenden
    if (userId) {
 
      kunden_id = userId.value;
 
      // optional Adresse dauerhaft speichern
      if (saveAddress && kunde?.adresse) {
 
        await pool.query(
          `UPDATE kunde
           SET adresse = $1,
               iban = $2
           WHERE kunden_id = $3`,
          [kunde.adresse, kunde.iban, kunden_id]
        );
 
      }
 
    } else {
 
      // 2️⃣ Gastkunde erstellen
 
      const kundeResult = await pool.query(
        `INSERT INTO kunde
        (kunden_vorname, kunden_nachname, email, passwort_hash, adresse)
        VALUES ($1,$2,$3,'kein_login',$4)
        RETURNING kunden_id`,
        [
          kunde.vorname,
          kunde.nachname,
          kunde.email,
          kunde.adresse
        ]
      );
 
      kunden_id = kundeResult.rows[0].kunden_id;
 
    }
 
    // 3️⃣ Bestellung erstellen
 
    const bestellungResult = await pool.query(
      `INSERT INTO bestellung
       (kunden_id, status)
       VALUES ($1,'abgeschlossen')
       RETURNING bestell_id`,
      [kunden_id]
    );
 
    const bestell_id = bestellungResult.rows[0].bestell_id;
 
    // 4️⃣ Positionen speichern + Lager prüfen
 
    for (const item of items) {
 
      // Position speichern
      await pool.query(
        `INSERT INTO bestellposition
         (bestell_id, buch_id, menge, einzelpreis)
         VALUES ($1,$2,$3,$4)`,
        [
          bestell_id,
          item.buch_id,
          item.menge,
          item.preis
        ]
      );
 
      // Prüfen ob gedrucktes Buch
      const gedruckt = await pool.query(
        `SELECT bestand_anzahl
         FROM gedrucktesbuch
         WHERE buch_id = $1`,
        [item.buch_id]
      );
 
      if (gedruckt.rows.length > 0) {
 
        const bestand = gedruckt.rows[0].bestand_anzahl;
 
        // prüfen ob genug Bestand vorhanden
        if (bestand < item.menge) {
 
          return NextResponse.json(
            { error: "Nicht genug Bücher auf Lager" },
            { status: 400 }
          );
 
        }
 
        // Lager reduzieren
        await pool.query(
          `UPDATE gedrucktesbuch
           SET bestand_anzahl = bestand_anzahl - $1
           WHERE buch_id = $2`,
          [
            item.menge,
            item.buch_id
          ]
        );
 
      }
 
    }
 
    // 5️⃣ Zahlung speichern
 
    if (kunde?.iban) {
 
      await pool.query(
        `INSERT INTO zahlung
         (bestell_id, zahlungsart, iban)
         VALUES ($1,'SEPA',$2)`,
        [
          bestell_id,
          kunde.iban
        ]
      );
 
    }
 
    return NextResponse.json({
      success: true,
      bestell_id
    });
 
  } catch (error) {
 
    console.error(error);
 
    return NextResponse.json(
      { error: "Fehler bei Bestellung" },
      { status: 500 }
    );
 
  }
 
}