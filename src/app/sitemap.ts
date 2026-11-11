import type { MetadataRoute } from "next";

const SITE = "https://gunavati.art";
const locales = ["en", "ru", "uk", "fr"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: `${SITE}/${l}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(locales.map((x) => [x, `${SITE}/${x}`])),
    },
  }));
}
