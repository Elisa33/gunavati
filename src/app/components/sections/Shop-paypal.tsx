"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaypal, FaTimes, FaDownload } from "react-icons/fa";


const albums = [
  {
    id: 1,
    title: "A New World",
    slug: "a-new-world",
    year: "2024",
    cover: "/img/album-03.webp",
    minPrice: 2,
    tracks: ["A New World Kiirtan"],
  },
  {
    id: 2,
    title: "Again",
    slug: "again",
    year: "2024",
    cover: "/img/album-04.webp",
    minPrice: 4,
    tracks: [" Again (Снова)", "Again Kiirtan"],
  },
  {
    id: 3,
    title: "The Light of Awakening",
    slug: "the-light-of-awakening",
    year: "2025",
    cover: "/img/album-02.webp",
    minPrice: 4,
    tracks: [
      "The Light of Awakening (Свет пробудження)",
      "The Light of Awakening Kiirtan",
    ],
  },
  {
    title: "My Only Hope",
    slug: "my-only-hope",
    year: "2026",
    cover: "/img/album-01.webp",
    minPrice: 8,
    tracks: ["My Only Hope", "⁠I’m Yours", "⁠Між двох долонь", "⁠Mi Esperanza"],
  },
  {
    id: 5,
    title: "Kirtan Live Ananda Gaori",
    slug: "kirtan-live-ananda-gaori",
    year: "2026",
    cover: "/img/album-05.webp",
    minPrice: 8,
    tracks: [
      "Between Two Palms Kiirtan",
      "⁠Mystery Kiirtan",
      "⁠A Silent Moment Kiirtan",
      "⁠Fight for Truth Kiirtan",
    ],
  },
];

const BUY_ALL_SLUG = "full-discography";

const BUY_ALL_MIN = 20;

const AlbumCard = ({
  album,
  onDonate,
}: {
  album: (typeof albums)[0];
  onDonate: (album: {
    title: string;
    minPrice: number;
    isAll?: boolean;
    slug?: string;
    tracks?: string[];
  }) => void;
}) => {
  const [showTracks, setShowTracks] = useState(false);

  return (
    <div className="group flex flex-col items-center w-full">
      {/* Contenedor de la imagen con el overlay */}
      <div
        className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow cursor-pointer"
        onMouseEnter={() => setShowTracks(true)} // Mostrar en desktop (hover)
        onMouseLeave={() => setShowTracks(false)} // Ocultar al sacar el mouse
        onClick={() => setShowTracks(!showTracks)} // Mostrar/Ocultar en mobile (tap)
      >
        <Image
          src={album.cover}
          alt={album.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* OVERLAY DEL TRACKLIST */}
        {album.tracks && album.tracks.length > 0 && (
          <div
            className={`absolute inset-0 bg-primary-700/50 backdrop-blur-sm p-4 transition-opacity duration-300 ${
              showTracks ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-xs lg:text-sm uppercase tracking-wider text-secondary-400 mb-2 font-semibold text-center">
              Tracklist
            </p>
            <ul className="space-y-1 overflow-y-auto h-[80%] text-center">
              {album.tracks.map((track, index) => (
                <li
                  key={index}
                  className="text-xs lg:text-sm text-background-100"
                >
                  {index + 1}. {track}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Info de abajo (Siempre visible) */}
      <h3 className="mt-3 text-base text-primary-700 text-center line-clamp-2 min-h-10">
        {album.title}
      </h3>
      <p className="text-xs text-primary-600">{album.year}</p>

      <button
        onClick={() => onDonate(album)}
        className="mt-2 flex items-center gap-2 text-sm px-5 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        <FaDownload className="text-xs hidden lg:block" />
        Download €{album.minPrice}+
      </button>
    </div>
  );
};

const Shop = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<{
    title: string;
    minPrice: number;
    isAll: boolean;
    slug?: string;
    tracks?: string[];
  } | null>(null);

  const [customAmount, setCustomAmount] = useState("");

  const openDonate = (album: {
    title: string;
    minPrice: number;
    isAll?: boolean;
    slug?: string;
  }) => {
    setSelectedAlbum({ ...album, isAll: album.isAll || false });
    setCustomAmount("");
  };

  // El ID del botón de donación de Francia
  const PAYPAL_BUTTON_ID = "PJDK9QSLPWQ22";

  const handleDonate = (amount: number) => {
    const downloadSlug = selectedAlbum?.isAll
      ? BUY_ALL_SLUG
      : selectedAlbum?.slug;
    const returnUrl = selectedAlbum
      ? `${window.location.origin}/download/${downloadSlug}`
      : `${window.location.origin}/thank-you`;

    const params = new URLSearchParams({
      hosted_button_id: PAYPAL_BUTTON_ID,
      amount: amount.toString(), // Intentamos forzar el monto
      currency_code: "EUR",
      return: returnUrl,
    });

    window.open(
      `https://www.paypal.com/donate/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );

    setSelectedAlbum(null);
  };

  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      handleDonate(amount);
    }
  };

  return (
    <section
      id="shop"
      className="relative py-20 bg-background-100 text-primary-700"
    >
      <div className="mx-auto w-11/12 max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="uppercase lg:text-lg text-primary-600 tracking-wider">
            take the journey with you
          </span>
          <h2 className="font-script text-7xl md:text-8xl text-secondary-500">
            my music
          </h2>
          {/* Corregido el typo "f this" -> "If this" */}
          <p className="md:text-lg max-w-xl mx-auto mt-4 text-primary-600">
            If this music has touched you, you can help it continue. Every
            contribution goes directly into creating new work — so that more
            songs can find their way to those who need them.
          </p>
        </div>

        {/* Albums grid */}
        <div className="mb-12">
          {/* Mobile: 2 cols, last centered same size */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            {albums.map((album, index) => (
              <div
                key={index}
                className={index === 4 ? "col-span-2 flex justify-center" : ""}
              >
                <div
                  className={index === 4 ? "w-[calc(50%-0.75rem)]" : "w-full"}
                >
                  <AlbumCard album={album} onDonate={openDonate} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: interleaved layout */}
          <div className="hidden md:grid grid-cols-6 gap-14 max-w-4xl mx-auto">
            {/* Row 1 */}
            <div className="col-start-1 col-span-2">
              <AlbumCard album={albums[0]} onDonate={openDonate} />
            </div>
            <div className="col-start-3 col-span-2">
              <AlbumCard album={albums[1]} onDonate={openDonate} />
            </div>
            <div className="col-start-5 col-span-2">
              <AlbumCard album={albums[2]} onDonate={openDonate} />
            </div>

            {/* Row 2 - interleaved */}
            <div className="col-start-2 col-span-2">
              <AlbumCard album={albums[3]} onDonate={openDonate} />
            </div>
            <div className="col-start-4 col-span-2">
              <AlbumCard album={albums[4]} onDonate={openDonate} />
            </div>
          </div>
        </div>

        {/* Buy all */}
        <div className="mx-auto w-11/12 max-w-7xl mt-20 px-6">
          <div className="text-center mb-8">
            <h3 className="font-script text-5xl md:text-6xl text-primary-600 mt-2">
              the full journey
            </h3>
            <p className="md:text-lg mt-4 text-primary-600 pt-6">
              <span className="block">All albums, one place.</span> Download the
              complete collection and carry{" "}
              <span className="sm:block"> the whole journey with you.</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() =>
              openDonate({
                title: "Complete Discography",
                minPrice: BUY_ALL_MIN,
                isAll: true,
                slug: "full-discography",
              })
            }
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-secondary-500 text-white md:text-lg font-semibold hover:bg-secondary-600 transition-colors shadow-md"
          >
            <FaDownload />
            Buy all discography €{BUY_ALL_MIN}+
          </button>
        </div>
      </div>

      {/* Donate Modal */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedAlbum(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-primary-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAlbum(null)}
              className="absolute top-4 right-4 text-primary-400 hover:text-primary-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h3 className="text-3xl text-primary-600 mb-1">
              {selectedAlbum.title}
            </h3>
            <p className="text-sm text-primary-400 mb-4">
              Minimum €{selectedAlbum.minPrice} — or give more to support future
              work
            </p>

            {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 && (
              <div className="mb-6 bg-primary-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                <p className="text-xs uppercase tracking-wider text-primary-400 mb-2 font-semibold">
                  Tracklist
                </p>
                <ul className="space-y-1">
                  {selectedAlbum.tracks.map((track, index) => (
                    <li
                      key={index}
                      className="text-sm text-primary-700 flex gap-2"
                    >
                      <span className="text-primary-400">{index + 1}.</span>
                      {track}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3 mb-6">
              {(selectedAlbum.isAll
                ? [20, 25, 30, 35]
                : [selectedAlbum.minPrice, selectedAlbum.minPrice * 2, 20, 30]
              ).map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleDonate(amount)}
                  className="py-3 rounded-xl border-2 border-primary-200 text-primary-600 font-semibold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all"
                >
                  €{amount}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                  €
                </span>
                <input
                  type="number"
                  min={selectedAlbum.minPrice}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Other amount"
                  className="w-full pl-8 pr-3 py-3 rounded-xl border-2 border-primary-200 text-primary-600 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <button
                onClick={handleCustomDonate}
                disabled={
                  !customAmount ||
                  parseFloat(customAmount) < selectedAlbum.minPrice
                }
                className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Give
              </button>
            </div>

            <p className="text-xs text-primary-300 mt-4 flex items-center gap-1">
              <FaPaypal />
              Opens PayPal — no account needed, card accepted
            </p>
          </div>
        </div>
      )}
    </section>
  );
};;

export default Shop;