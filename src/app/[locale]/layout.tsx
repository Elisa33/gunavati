import type { Metadata } from "next";
import { Passions_Conflict, Cormorant_Garamond, Raleway, Great_Vibes } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"], // ¡Importante! Soporta cirílico
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "cyrillic"], // Soporta cirílico
  weight: "400", // Great Vibes solo tiene peso 400
  variable: "--font-great-vibes",
  display: "swap",
});

const SITE = "https://gunavati.art";
const locales = ["en", "ru", "uk", "fr"] as const;
const ogLocales: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  uk: "uk_UA",
  fr: "fr_FR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const url = `${SITE}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "Gunavati" }],
    creator: "Gunavati",
    metadataBase: new URL(SITE),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE}/${l}`])),
        "x-default": `${SITE}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Gunavati",
      locale: ogLocales[locale] ?? "en_US",
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type: "website",
      images: [
        {
          url: "/img/og-image.png",
          width: 1200,
          height: 630,
          alt: t("og_alt"),
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
}

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
        className={`${passionsConflict.variable} ${raleway.variable} ${cormorant.variable} ${greatVibes.variable} antialiased lang-${locale}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>

        <GoogleAnalytics gaId="G-27GNXF67BM" />
      </body>
    </html>
  );
}
