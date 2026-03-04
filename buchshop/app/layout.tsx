export const dynamic = "force-dynamic";
 
import Link from "next/link";

import { cookies } from "next/headers";

import { CartProvider } from "./context/CartContext";

import CartIndicator from "./components/CartIndicatir";

import "./globals.css";
 
export const metadata = {

  title: "Online Buchshop",

};
 
export default async function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {
 
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id");
 
  return (
<html lang="de">
<body className="bg-gray-100">
 
        <CartProvider>
 
          <nav className="bg-white shadow p-4 flex items-center">
 
            <Link href="/" className="font-semibold">

              Bücher
</Link>
 
            <div className="ml-auto flex gap-6 items-center">
 
              {userId ? (
<>
<Link href="/konto">Mein Konto</Link>
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
 