import { cookies } from "next/headers";
import { pool } from "@/lib/db";
import Link from "next/link";
import { CartProvider } from "./context/CartContext";
import CartIndicator from "./components/CartIndicatir";
 
import "./globals.css";
 
export const metadata = {
  title: "LuckyLeaf Books",
};
 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
 
  let isAdmin = false;
 
  if (userId) {
 
    const result = await pool.query(
      `SELECT is_admin FROM kunde WHERE kunden_id = $1`,
      [userId.value]
    );
 
    isAdmin = result.rows[0]?.is_admin || false;
 
  }
 
  return (
 
    <html lang="de">
<body className="bg-gray-100">
 
        <CartProvider>
 
          <nav className="bg-white shadow p-4 flex items-center">
 
            <Link href="/" className="font-semibold text-green-700 flex items-center gap-2">
              🍀 LuckyLeaf 
</Link>
 
            <div className="ml-auto flex gap-6 items-center">
 
              <Link href="/">Bücher</Link>
 
              {userId ? (
<>
<Link href="/konto">Mein Konto</Link>
 
                  {isAdmin && (
<Link
                      href="/admin"
                      className="text-green-700 font-semibold"
>
                      Admin
</Link>
                  )}
 
                  <a href="/api/logout">Logout</a>
</>
              ) : (
<>
<Link href="/login">Login</Link>
<Link href="/register">Registrieren</Link>
</>
              )}
 
              <CartIndicator />
 
            </div>
 
          </nav>
 
          <div className="p-8">
            {children}
</div>
 
        </CartProvider>
 
      </body>
</html>
 
  );
}