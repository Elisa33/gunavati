import type { Metadata } from "next";
import { Passions_Conflict, Raleway, Lavishly_Yours } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: "Gunavati — Sacred Art for the Heart's Journey",
  description:
    "Spiritual music and poetry by Gunavati. Download albums, listen to sacred songs, and support the creation of more music.",
  keywords: [
    "spiritual music",
    "sacred art",
    "kirtan",
    "mantra",
    "meditation music",
    "Gunavati",
  ],
  authors: [{ name: "Gunavati" }],
  creator: "Gunavati",
  alternates: {
    canonical: "https://gunavati.art",
  },
  openGraph: {
    title: "Gunavati — Sacred Art for the Heart's Journey",
    description:
      "Spiritual music and poetry by Gunavati. Download albums, listen to sacred songs, and support the creation of more music.",
    url: "https://gunavati.art",
    siteName: "Gunavati",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gunavati — Sacred Art for the Heart's Journey",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Pasamos las variables al body */}
      <body
        className={`${passionsConflict.variable} ${raleway.variable} ${lavishlyYours.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-27GNXF67BM" />
      </body>
    </html>
  );
}



