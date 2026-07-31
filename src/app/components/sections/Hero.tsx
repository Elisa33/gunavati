"use client";
import React, { useState, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // 👉 Referencia para el video

  // Función para reproducir o pausar AMBOS (audio y video)
  const toggleMedia = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      videoRef.current?.pause(); // Pausamos el video
    } else {
      audioRef.current?.play();
      videoRef.current?.play(); // Reproducimos el video
    }
    setIsPlaying(!isPlaying);
  };

  // Cuando el audio termina, pausamos todo y reiniciamos el botón
  const handleAudioEnd = () => {
    setIsPlaying(false);
    videoRef.current?.pause(); // Nos aseguramos de pausar el video
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-16 overflow-hidden"
    >
      {/* Fondo Mobile (Imagen estática para no gastar datos) */}
      <Image
        src="/img/bg-mobile.webp"
        alt="Background"
        fill
        className="object-cover md:hidden z-0"
        priority
        sizes="(max-width: 767px) 100vw, 0px"
      />

      {/* Fondo Desktop (Video con poster de imagen) */}
      {/* 👉 preload="none" asegura que no pese nada hasta que le den play */}
      <video
        ref={videoRef}
        poster="/img/bg-desktop.webp"
        preload="none"
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[40%_20%] z-0 hidden md:block"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlays de gradiente */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent md:from-black/50 md:via-black/0 md:to-transparent z-1"></div>
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/0 to-transparent md:from-black/50 md:via-black/0 md:to-transparent z-1 md:hidden"></div>

      {/* Contenido */}
      <div className="relative z-10 w-full grow flex">
        <div className="hidden md:block md:w-4/12"></div>

        <div className="w-full md:w-8/12 flex flex-col justify-between pt-20 py-12 px-8 md:px-16 lg:px-24 text-background-100">
          <h1 className="text-[65px] sm:text-7xl lg:text-8xl font-script drop-shadow-lg leading-none">
            Sacred art
            <span className="block">for the journey</span>
            <span>
              of <span className="w-4 inline-block"></span>your heart
            </span>
          </h1>
          <div>
            <p className="text md:text-xl font-body drop-shadow-md">
              Discover healing sounds and words{" "}
              <span className="sm:block md:inline">
                that embrace your soul and fill your heart.
              </span>
            </p>

            {/* Botón que controla todo */}
            <button
              onClick={toggleMedia}
              className="group flex items-center gap-3 mt-3 p-2 pl-5 pr-6 rounded-full w-fit transition-all bg-background-100/90 hover:bg-background-100"
            >
              {isPlaying ? (
                <FaPause className="h-5 text-secondary-500 group-hover:text-primary-500 text-2xl transition-colors" />
              ) : (
                <FaPlay className="h-5 text-secondary-500 group-hover:text-primary-500 text-xl transition-colors ml-1" />
              )}
              <span className="text-lg text-primary-600 font-medium">
                {isPlaying ? "Pause" : "Listen Now"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="/audio/preview.mp3"
        onEnded={handleAudioEnd}
        className="hidden"
      />
    </section>
  );
};;;;;;;;;

export default Hero;