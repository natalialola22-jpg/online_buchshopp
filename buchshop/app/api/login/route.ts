import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

import bcrypt from "bcrypt";

import { cookies } from "next/headers";

export async function POST(req: Request) {

  const body = await req.json();

  const { email, passwort } = body;

  try {

    const result = await pool.query(

      "SELECT * FROM kunde WHERE email = $1",

      [email]

    );

    const user = result.rows[0];

    if (!user) {

      return NextResponse.json(

        { error: "User nicht gefunden" },

        { status: 401 }

      );

    }

    const valid = await bcrypt.compare(

      passwort,

      user.passwort_hash

    );

    if (!valid) {

      return NextResponse.json(

        { error: "Falsches Passwort" },

        { status: 401 }

      );

    }

    const cookieStore = await cookies();

    cookieStore.set("user_id", user.kunden_id.toString(), {

      httpOnly: true,

      path: "/",

    });

    return NextResponse.json({ success: true });

  } catch (error) {

    return NextResponse.json(

      { error: "Login fehlgeschlagen" },

      { status: 500 }

    );

  }

}
 