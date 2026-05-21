import React from "react";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col pt-16">
      <Image
        src="/img/bg-mobile.webp"
        alt="Background"
        fill
        className="object-cover md:hidden -z-10"
        priority
      />
      <Image
        src="/img/bg-desktop.webp"
        alt="Background"
        fill
        className="object-cover hidden md:block -z-10"
        priority
      />
      <div className="w-full grow flex">
        <div className="hidden md:block md:w-4/12"></div>

        <div className="w-full md:w-8/12 flex flex-col justify-between pt-20 py-12 px-10 md:px-16 lg:px-24 text-background-100">
          <h1 className="text-7xl md:text-8xl font-script drop-shadow-lg leading-none">
            Sacred art
            <span className="block">for the heart's journey</span>
          </h1>
          <div>
            <p className="text-lg md:text-xl font-body">
              Discover healing sounds and words that embrace your soul and fill
              your heart.
            </p>
            <a
              href="#music"
              className="group flex items-center gap-2 mt-6 p-2 px-5 rounded-full w-fit transition-all bg-background-100/90 hover:bg-background-100"
            >
              <FaPlay className="h-6 text-secondary-500 group-hover:text-primary-500 text-3xl transition-colors" />
              <span className="text-lg text-primary-500">Listen now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
