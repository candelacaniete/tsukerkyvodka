import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tsukerky Vodka | Sabor Chicle",
  description:
    "Landing editorial inmersiva para Tsukerky Vodka: nostalgia candy, estética Y2K y vodka con actitud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
