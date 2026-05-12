"use client";

import React, { useState } from "react";
import { FaPlay, FaHeadphones, FaTimes } from "react-icons/fa";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer";

const videos = [
  {
    id: "fjZ6YY8FrU8",
    title: "Mystery Kiirtan",
    description:
      "Ethereal vocals weaving sacred melodies into transcendent spiritual communion.",
  },
  {
    id: "sIJZRo3NVp4",
    title: "The World I'll Give",
    description:
      "Repetitive sacred syllables invoking inner peace and spiritual awakening.",
  },
  {
    id: "IMbZCh0apa8",
    title: "Когда я буду уходить",
    description: "Spoken wisdom and poetic verses guiding the soul inward.",
  },
];

const Videos = () => {
  const [modal, setModal] = useState<{
    type: "video" | "audio";
    id: string;
  } | null>(null);

  const closeModal = () => setModal(null);

  return (
    <section id="music" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-3 items-center mx-auto w-11/12 max-w-7xl">
        <span className="uppercase text-lg text-accent">LISTEN</span>
        <h2 className="font-lavishly-yours text-8xl -translate-y-8 text-secondary-500">
          my voice
        </h2>
        <p className="md:w-2/3 text-center text-accent">
          This music was made to return you to yourself — to the quiet place
          within where you are already whole, already connected. Let the sound
          meet you wherever you are right now, and see where it takes you.
        </p>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 md:mt-20">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-primary-100 cursor-pointer overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

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
                {video.title}
              </h3>
              <p className="text-sm text-primary-800/60 mb-4">
                {video.description}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setModal({ type: "video", id: video.id })}
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <FaPlay className="text-xs" />
                  Watch
                </button>
                <button
                  onClick={() => setModal({ type: "audio", id: video.id })}
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <FaHeadphones className="text-xs" />
                  Listen
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
                {/* <p className="text-lg text-primary-700 mb-6">
                  Close your eyes and just listen
                </p> */}
                {/* <iframe
                  src={`https://www.youtube.com/embed/${modal.id}?autoplay=1&rel=0`}
                  title="Audio player"
                  allow="autoplay; encrypted-media"
                  className="w-full max-w-md"
                  style={{ height: "80px" }}
                /> */}

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

/* import React from 'react'

const Art = () => {
  return (
    <section id="art" className="min-h-screen">
      <div className="flex flex-col gap-3 items-center mx-auto w-11/12 max-w-7xl">
        <span className="uppercase text-lg text-accent">LISTEN</span>
        <h2 className="font-lavishly-yours text-8xl -translate-y-8 text-secondary-500">
          my voice
        </h2>
        <p className="md:w-2/3 text-center text-accent">
          This music was made to return you to yourself — to the quiet place
          within where you are already whole, already connected. Let the sound
          meet you wherever you are right now, and see where it takes you.
        </p>
      </div>
      <div className="grid grid-cols-3"></div>
    </section>
    
  );
}

export default Art */
