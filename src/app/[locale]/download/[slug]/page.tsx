import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FaDownload, FaHome, FaShieldAlt } from "react-icons/fa";

// 1. Base de datos local: acá mapeás el slug de la URL con los datos del álbum
// Cuando subas los archivos a Google Drive/Cloudflare, ponés los links acá.
const downloadData: Record<
  string,
  { title: string; links: { format: string; all?: boolean; url: string }[] }
> = {
  "my-only-hope": {
    title: "My Only Hope",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/My-Only-Hope-MP3.zip",
      }, // Reemplazá # con el link real
      /*{ format: "FLAC", url: "#" },*/
    ],
  },
  "the-light-of-awakening": {
    title: "The Light of Awakening",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/The-Light-Of-Awakening-MP3.zip",
      },
      /*{ format: "FLAC", url: "#" },*/
    ],
  },
  "a-new-world": {
    title: "A New World",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/A-New-World-Kiirtan.zip",
      },
      /*{ format: "FLAC", url: "#" },*/
    ],
  },
  again: {
    title: "Again",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Again-MP3.zip",
      },
      /*{ format: "FLAC", url: "#" },*/
    ],
  },
  "kirtan-live-ananda-gaori": {
    title: "Kirtan Live Ananda Gaori",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kirtan-Live-AG-MP3.zip",
      },
      /*{ format: "FLAC", url: "#" },*/
    ],
  },
  "tamasacchanna-dharay": {
    title: "Tamasácchanna Dharáy",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-MP3.zip",
      },
      {
        format: "M4A",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-M4A.zip",
      },
    ],
  },
  "kirtan-for-the-journey-within": {
    title: "Kirtan for The Journey Within",
    links: [
      {
        format: "MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kiirtan-for-The-Journey-Within-MP3.zip",
      },
      /*{
        format: "M4A",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kiirtan-for-The-Journey-Within-M4A.zip",
      },*/
    ],
  },
  "full-discography": {
    title: "The Complete Discography",
    links: [
      {
        format: "MP3", all: true,
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Full-Discography-mp3.zip",
      },
      /*{ format: "FLAC", all: true, url: "#" },*/
    ],
  },
};

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations("Download");

  const album = downloadData[slug];

  if (!album) {
    return (
      <main className="min-h-dvh bg-background-100 flex items-center justify-center text-primary-700 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">{t("not_found")}</h1>
          <Link href={`/${locale}`} className="text-primary-500 underline hover:text-primary-700">
            {t("go_home")}
          </Link>
        </div>
      </main>
    );
  }

  const title = slug === "full-discography" ? t("full_discography") : album.title;

  return (
    <main className="min-h-dvh bg-background-100 flex items-center justify-center text-primary-700 p-6">
      <div className="max-w-lg w-full text-center bg-white p-10 md:p-12 rounded-3xl shadow-xl">
        <h1 className="font-script text-7xl text-secondary-600 mb-4">
          {t("thank_you")}
        </h1>

        <p className="text-lg text-primary-600 mb-8">
          {t.rich("purchase", {
            title,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <div className="flex flex-col gap-4">
          {album.links.map((link) => (
            <a
              key={link.format}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              <FaDownload />
              {link.all
                ? t("download_all", { format: link.format })
                : t("download_format", { format: link.format })}
            </a>
          ))}
        </div>

        <div className="mt-10 p-4 bg-secondary-100 rounded-xl text-sm text-primary-700 flex items-start gap-3 text-left">
          <FaShieldAlt className="text-secondary-600 mt-0.5 shrink-0" />
          <p>{t("copyright")}</p>
        </div>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 mt-8 text-primary-500 hover:text-primary-700 underline transition-colors"
        >
          <FaHome />
          {t("back_home")}
        </Link>
      </div>
    </main>
  );
}
