import { cookies } from "next/headers";
import { pool } from "@/lib/db";
import CheckoutForm from "./CheckoutForm";
 
export default async function CheckoutPage() {
 
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
 
  let kunde = null;
 
  if (userId) {
 
    const result = await pool.query(
      `SELECT
        kunden_vorname,
        kunden_nachname,
        email,
        strasse,
        hausnummer,
        plz,
        ort,
        iban
       FROM kunde
       WHERE kunden_id = $1`,
      [userId.value]
    );
 
    kunde = result.rows[0];
 
  }
 
  return (
<CheckoutForm kunde={kunde}/>
  );
 
}