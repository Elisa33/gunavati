import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-dvh bg-primary-500 text-white overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>

      <div className="relative grid sm:grid-cols-2 gap-6 md:gap-0 mx-auto max-w-7xl py-20 px-6">
        {/* Image wrapper con alto controlado - Ajustado justify para mobile/desktop */}
        <div className="max-h-[80vh] flex justify-center md:justify-end rounded-3xl overflow-hidden">
          {/* Imagen Mobile (Oculta en desktop) */}
          <Image
            src="/img/about-image-mobile.webp"
            alt="Gunavati portrait"
            width={424}
            height={540}
            className="h-full w-auto rounded-3xl sm:hidden"
          />

          {/* Imagen Desktop (Oculta en mobile) */}
          <Image
            src="/img/about-image3.jpeg"
            alt="Gunavati portrait"
            width={424}
            height={540}
            className="h-full w-auto object-cover rounded-3xl hidden sm:block"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center md:px-12 py-4 md:py-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-11/12 max-w-7xl">
              <span className="uppercase lg:text-lg text-background-100">
                about me
              </span>
              <h2 className="font-lavishly-yours text-8xl sm:text-7xl xl:text-8xl -translate-y-8 text-secondary-500">
                my story
              </h2>
            </div>

            <p className="lg:text-lg leading-7">
              Through original mantra melodies, heartfelt songs, and
              contemplative verse, I weave music and poetry into invitations for
              reflection, connection, and a deeper experience of the sacred.
            </p>
            <p className="lg:text-lg leading-7">
              Music and poetry are not simply creative expressions for me—they
              are a path of devotion, self-discovery, and service. Each melody
              and each verse arises from a sincere desire to bring more peace,
              beauty, and meaning into the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
