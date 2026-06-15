import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tsukerky Vodka | The Candy Vodka",
  description:
    "An immersive editorial landing page for Tsukerky Vodka, inspired by candy nostalgia, street culture and club energy.",
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
