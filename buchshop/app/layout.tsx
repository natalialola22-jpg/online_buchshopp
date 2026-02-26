import Link from "next/link";

import { CartProvider } from "./context/CartContext";

import CartIndicator from "./components/CartIndicatir";

import "./globals.css";
 
export const metadata = {

  title: "Online Buchshop",

};
 
export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (
<html lang="de">
<body className="bg-gray-100">
<CartProvider>
<nav className="bg-white shadow p-4 flex items-center gap-6">
<Link href="/" className="font-semibold">

              Bücher
</Link>
 
            <div className="ml-auto">
<CartIndicator />
</div>
</nav>
 
          <div className="p-8">{children}</div>
</CartProvider>
</body>
</html>

  );

}
 