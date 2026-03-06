export const dynamic = "force-dynamic";
 
import Link from "next/link";
import { cookies } from "next/headers";
 
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
 
  return (
<html lang="de">
<body className="bg-gray-100">
 
        <CartProvider>
 
          {/* Header */}
<nav className="bg-white shadow-md px-10 py-5 flex items-center">
 
            {/* Logo */}
<Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold text-green-700 hover:text-green-800 transition"
>
<span className="text-2xl">🍀</span>
              LuckyLeaf Books
</Link>
 
            {/* Navigation */}
<div className="ml-auto flex gap-6 items-center text-gray-700">
 
              <Link
                href="/"
                className="hover:text-green-700 transition"
>
                Bücher
</Link>
 
              {userId ? (
<>
<Link
                    href="/konto"
                    className="hover:text-green-700 transition"
>
                    Mein Konto
</Link>
 
                  <a
                    href="/api/logout"
                    className="hover:text-green-700 transition"
>
                    Logout
</a>
</>
              ) : (
<>
<Link
                    href="/login"
                    className="hover:text-green-700 transition"
>
                    Login
</Link>
 
                  <Link
                    href="/register"
                    className="hover:text-green-700 transition"
>
                    Registrieren
</Link>
</>
              )}
 
              {/* Warenkorb */}
<CartIndicator />
 
            </div>
 
          </nav>
 
          {/* Seiteninhalt */}
<main className="p-8">
            {children}
</main>
 
        </CartProvider>
 
      </body>
</html>
  );
}