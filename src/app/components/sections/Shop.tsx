"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaypal, FaTimes, FaDownload } from "react-icons/fa";

const albums = [
  {
    id: 1,
    title: "My Only Hope",
    year: "2020",
    cover: "/img/album-01.webp",
    minPrice: 4,
  },
  {
    id: 2,
    title: "The Light of Awakening",
    year: "2021",
    cover: "/img/album-02.webp",
    minPrice: 4,
  },
  {
    id: 3,
    title: "A New World",
    year: "2022",
    cover: "/img/album-03.webp",
    minPrice: 4,
  },
  {
    id: 4,
    title: "Again",
    year: "2023",
    cover: "/img/album-04.webp",
    minPrice: 4,
  },
  {
    id: 5,
    title: "Kirtan Live",
    year: "2025",
    cover: "/img/album-05.webp",
    minPrice: 4,
  },
];

const BUY_ALL_MIN = 15;


const AlbumCard = ({
  album,
  onDonate,
}: {
  album: (typeof albums)[0];
  onDonate: (album: {
    title: string;
    minPrice: number;
    isAll?: boolean;
  }) => void;
}) => (
  <div className="group flex flex-col items-center">
    <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
      <Image
        src={album.cover}
        alt={album.title}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <h3 className="mt-3 text-base text-primary-700 text-center line-clamp-2 min-h-[2.5rem]">
      {album.title}
    </h3>
    <p className="text-xs text-primary-400">{album.year}</p>
    <button
      onClick={() => onDonate(album)}
      className="mt-2 flex items-center gap-2 text-sm px-4 py-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
    >
      <FaDownload className="text-xs" />
      Download €{album.minPrice}+
    </button>
  </div>
);


const Shop = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<{
    title: string;
    minPrice: number;
    isAll: boolean;
  } | null>(null);

  const [customAmount, setCustomAmount] = useState("");
  const [IsDonateOpen, setIsDonateOpen] = useState(false);

  const openDonate = (album: {
    title: string;
    minPrice: number;
    isAll?: boolean;
  }) => {
    setSelectedAlbum({ ...album, isAll: album.isAll || false });
    setCustomAmount("");
  };

 const PAYPAL_BUTTON_ID = "G8J5W73XEY5TY";

const handleDonate = (amount: number) => {
  const params = new URLSearchParams({
    hosted_button_id: PAYPAL_BUTTON_ID,
    amount: amount.toString(),
    currency_code: "EUR",
    return: `${window.location.origin}/thank-you`,
  });

  window.open(
    `https://www.paypal.com/donate/?${params.toString()}`,
    "_blank",
    "noopener,noreferrer",
  );

  setIsDonateOpen(false);
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
        <div className="text-center mb-16 px-6">
          <span className="uppercase text-lg text-primary-400 tracking-wider">
            keep this music alive
          </span>
          <h2 className="font-script text-8xl text-secondary-600 -translate-y-4">
            my vision
          </h2>
          <p className="text-lg max-w-xl mx-auto mt-4 text-primary-500">
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
                key={album.id}
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
          <div className="hidden md:grid grid-cols-6 gap-8 max-w-4xl mx-auto">
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
            <h3 className="font-script text-6xl text-primary-600 mt-2">
              the full journey
            </h3>
            <p className="text-lg mt-4 text-primary-500 pt-6">
              <span className="block">All albums, one place.</span> Download the
              complete collection and carry the whole journey with you.
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
              })
            }
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-secondary-500 text-white text-lg font-semibold hover:bg-secondary-600 transition-colors shadow-md"
          >
            <FaDownload />
            Buy all discography €{BUY_ALL_MIN}+
          </button>
        </div>
      </div>

      {/* Donate Modal */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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

            <h3 className="font-script text-3xl text-primary-600 mb-1">
              {selectedAlbum.title}
            </h3>
            <p className="text-sm text-primary-400 mb-6">
              Minimum €{selectedAlbum.minPrice} — or give more to support future
              work
            </p>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {[selectedAlbum.minPrice, 5, 10, 20].map((amount) => (
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
};

export default Shop;