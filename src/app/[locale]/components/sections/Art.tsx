"use client";

import React, { useState } from "react";
import { FaPlay, FaHeadphones, FaTimes } from "react-icons/fa";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer";
import { useTranslations } from "next-intl"; // 👉 Importamos el hook

// Sacamos los textos del array, dejamos solo los IDs
const videos = [
  { id: "fjZ6YY8FrU8" },
  { id: "sIJZRo3NVp4" },
  { id: "IMbZCh0apa8" },
];

const Videos = () => {
  const t = useTranslations("Art"); // 👉 Inicializamos
  const [modal, setModal] = useState<{
    type: "video" | "audio";
    id: string;
  } | null>(null);

  const closeModal = () => setModal(null);

  return (
    <section id="music" className="py-20 px-6">
      <div className="flex flex-col gap-3 items-center mx-auto max-w-7xl px-6">
        <span className="uppercase lg:text-lg text-accent">{t("tag")}</span>
        <h2 className="font-script text-8xl font-subtitle -translate-y-8 text-secondary-500">
          {t("title")}
        </h2>
        <p className="md:w-2/3 text-center text-accent2">
          {t("paragraph_start")}{" "}
          <span className="lg:block">{t("paragraph_end")}</span>
        </p>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 md:mt-20 px-6 mx-auto max-w-5xl">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-primary-100 cursor-pointer overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={t(`videos.${video.id}.title`)} // 👉 Alt traducido
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Color blend layer */}
              <div className="absolute inset-0 bg-secondary-500/30 mix-blend-multiply pointer-events-none" />

              {/* Play overlay */}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center"
                onClick={() => setModal({ type: "video", id: video.id })}
              >
                <FaPlay className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
            {/* Info + buttons */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-primary-700 mb-1">
                {t(`videos.${video.id}.title`)} {/* 👉 Título traducido */}
              </h3>
              <p className="text-sm text-primary-700 mb-4">
                {t(`videos.${video.id}.description`)} {/* 👉 Desc traducida */}
              </p>
              <div className="flex md:gap-2 lg:gap-3 gap-3 mt-auto">
                <button
                  onClick={() => setModal({ type: "video", id: video.id })}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 min-h-11 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <FaPlay className="text-xs" />
                  {t("watch_btn")}
                </button>
                <button
                  onClick={() => setModal({ type: "audio", id: video.id })}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 min-h-11 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <FaHeadphones className="text-xs" />
                  {t("listen_btn")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-primary-700 transition-colors shadow"
            >
              <FaTimes />
            </button>

            {modal.type === "video" ? (
              /* Video player */
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${modal.id}?autoplay=1&rel=0`}
                  title="Video player"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              /* Audio only */
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <FaHeadphones className="text-5xl text-primary-500 mb-6" />
                {modal.type === "audio" && <AudioPlayer videoId={modal.id} />}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Videos;