import Link from "next/link";
import { FaDownload, FaHome, FaShieldAlt } from "react-icons/fa";

// 1. Base de datos local: acá mapeás el slug de la URL con los datos del álbum
// Cuando subas los archivos a Google Drive/Cloudflare, ponés los links acá.
const downloadData: Record<
  string,
  { title: string; links: { name: string; url: string }[] }
> = {
  "my-only-hope": {
    title: "My Only Hope",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/My-Only-Hope-MP3.zip",
      }, // Reemplazá # con el link real
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "the-light-of-awakening": {
    title: "The Light of Awakening",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/The-Light-Of-Awakening-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "a-new-world": {
    title: "A New World",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/A-New-World-Kiirtan.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  again: {
    title: "Again",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Again-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "kirtan-live-ananda-gaori": {
    title: "Kirtan Live Ananda Gaori",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kirtan-Live-AG-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "tamasacchanna-dharay": {
    title: "Tamasácchanna Dharáy",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-MP3.zip",
      },
      {
        name: "Download M4A",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-M4A.zip",
      },
    ],
  },
  "full-discography": {
    title: "The Complete Discography",
    links: [
      {
        name: "Download All Albums (MP3)",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Full-Discography-mp3.zip",
      },
      /*{ name: "Download All Albums (FLAC)", url: "#" },*/
    ],
  },
};

export default async function DownloadPage({ params }: { params: { slug: string } }) {
  
  const { slug } = await params;
  
  const album = downloadData[slug];

  if (!album) {
    return (
      <main className="min-h-dvh bg-background-100 flex items-center justify-center text-primary-700 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Album not found</h1>
          <Link href="/" className="text-primary-500 underline hover:text-primary-700">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background-100 flex items-center justify-center text-primary-700 p-6">
      <div className="max-w-lg w-full text-center bg-white p-10 md:p-12 rounded-3xl shadow-xl">
        <h1 className="font-script text-7xl text-secondary-600 mb-4">
          Thank you
        </h1>

        <p className="text-lg text-primary-600 mb-8">
          Your purchase of <strong>{album.title}</strong> is complete. Here are
          your download links:
        </p>

        <div className="flex flex-col gap-4">
          {album.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              <FaDownload />
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-10 p-4 bg-secondary-100 rounded-xl text-sm text-primary-700 flex items-start gap-3 text-left">
          <FaShieldAlt className="text-secondary-600 mt-0.5 shrink-0" />
          <p>
            Thank you for respecting copyright and not sharing this link with
            anyone.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-primary-500 hover:text-primary-700 underline transition-colors"
        >
          <FaHome />
          Go back to the home
        </Link>
      </div>
    </main>
  );
}