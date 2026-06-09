import React from "react";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-16 overflow-hidden"
    >
      <Image
        src="/img/bg-mobile.webp"
        alt="Background"
        fill
        className="object-cover md:hidden z-0"
        priority
        sizes="(max-width: 767px) 100vw, 0px"
      />
      <Image
        src="/img/bg-desktop.webp"
        alt="Background"
        fill
        className="object-cover hidden md:block object-[15%] z-0"
        priority
        sizes="(min-width: 768px) 100vw, 0px"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent md:from-black/50 md:via-black/0 md:to-transparent z-1"></div>
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/0 to-transparent md:from-black/50 md:via-black/0 md:to-transparent z-1 md:hidden"></div>

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
            <a
              href="#music"
              className="group flex items-center gap-2 mt-6 p-2 px-4 md:px-5 rounded-full w-fit transition-all bg-background-100/90 hover:bg-background-100"
            >
              <FaPlay className="h-6 text-secondary-500 group-hover:text-primary-500 text-2xl md:text-3xl transition-colors" />
              <span className="md:text-lg text-primary-600">Listen now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
