import type { Metadata } from "next";
import { Passions_Conflict, Lavishly_Yours, Cormorant_Garamond, Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GoogleAnalytics } from '@next/third-parties/google';
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"], // ¡Importante! Soporta cirílico
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Gunavati — Sacred Art for the journey of your heart",
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
  metadataBase: new URL("https://gunavati.art"),
  openGraph: {
    title: "Gunavati — Sacred Art for the journey of your heart",
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
        alt: "Gunavati — Sacred Art for the journey of your heart",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${passionsConflict.variable} ${raleway.variable} ${lavishlyYours.variable} ${cormorant.variable} antialiased lang-${locale}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>

        <GoogleAnalytics gaId="G-27GNXF67BM" />
      </body>
    </html>
  );
}
