import Link from "next/link";

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
<nav className="bg-white shadow p-4 flex gap-6">
<Link href="/" className="font-semibold">

            Bücher
</Link>
<Link href="/kunden">

            Kunden
</Link>
<Link href="/bestellungen">

            Bestellungen
</Link>
<Link href="/dashboard">

            Dashboard
</Link>
</nav>
 
        <div className="p-8">

          {children}
</div>
</body>
</html>

  );

}
 