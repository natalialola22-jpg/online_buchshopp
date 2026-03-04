import { cookies } from "next/headers";
import { NextResponse } from "next/server";
 
export async function GET() {
 
  const cookieStore = await cookies();
 
  cookieStore.delete("user_id");
 
  return NextResponse.redirect(
    new URL("/", "http://localhost:3000")
  );
}