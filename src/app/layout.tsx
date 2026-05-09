import type { Metadata } from "next";
import { Passions_Conflict, Raleway, Lavishly_Yours } from "next/font/google";
import "./globals.css";

// Configuramos la fuente
const passionsConflict = Passions_Conflict({
  subsets: ["latin"],
  weight: "400", // Passions Conflict solo tiene peso 400 (Regular)
  variable: "--font-passions-conflict", // Creamos la variable CSS
  display: "swap",
});

// Configuramos Raleway
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway", // Nombre de la variable CSS
  display: "swap",
});

// Configuramos Lavishly Yours
const lavishlyYours = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400", // Lavishly Yours también solo tiene peso 400
  variable: "--font-lavishly-yours",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gunavati",
  description: "Próximamente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Pasamos las variables al body */}
      <body
        className={`${passionsConflict.variable} ${raleway.variable} ${lavishlyYours.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}



