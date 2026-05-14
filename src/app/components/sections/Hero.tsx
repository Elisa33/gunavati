import React from "react";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col pt-16 bg-[url(/img/bg-mobile.webp)] md:bg-[url(/img/bg-desktop.webp)] bg-cover"
    >
      <div className="w-full grow flex">
        <div className="hidden md:block md:w-5/12"></div>

        <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:px-16 lg:px-24 text-background-100">
          <h1 className="text-5xl md:text-8xl font-script drop-shadow-lg leading-none">
            Sacred art
            <span className="block">for the heart's journey</span>
          </h1>

          <p className="text-lg md:text-xl mt-10 font-body">
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
    </section>
  );
};

export default Hero;
