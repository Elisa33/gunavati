"use client"; // Obligatorio para usar useState (el menú hamburguesa)

import React, { useState } from "react";
import { FaBars, FaTimes, FaPlay } from "react-icons/fa"; // Íconos para el menú

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col bg-[url(/img/bg-mobile.jpeg)] md:bg-[url(/img/bg-desktop.png)] bg-cover"
    >
      {/* HEADER: Sticky aplicado acá para que toda la barra quede fija */}
      <header className="sticky top-0 z-50 bg-accent/70 backdrop-blur-md h-16 text-background-100">
        <div className="flex items-center justify-between h-full mx-auto w-11/12 max-w-7xl">
          {/* Logo */}
          <a
            href="#hero"
            className="font-script text-3xl md:text-4xl font-semibold"
          >
            Gunavati
          </a>

          {/* Navegación Desktop (Oculta en mobile) */}
          <nav className="hidden md:flex gap-8 text-lg font-medium">
            <a
              href="#music"
              className="hover:text-secondary-400 transition-colors"
            >
              Music
            </a>
            <a
              href="#about"
              className="hover:text-secondary-400 transition-colors"
            >
              About
            </a>
            <a
              href="#shop"
              className="hover:text-secondary-400 transition-colors"
            >
              Shop
            </a>
            <a
              href="#contact"
              className="hover:text-secondary-400 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Lado derecho: Idiomas y Hamburguesa */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-sm">EN | UK | FR</div>

            {/* Botón Hamburguesa (Solo visible en mobile) */}
            <button
              className="md:hidden text-2xl z-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MOBILE DESLIZANTE */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-secondary-500 z-60 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Botón X dentro del menú para cerrar */}
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Links del menú mobile */}
        <nav className="flex flex-col items-center justify-center h-3/4 gap-8 text-2xl text-primary-600">
          <a
            href="#music"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            Music
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            About
          </a>
          <a
            href="#shop"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            Shop
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            Contact
          </a>

          {/* Idiomas dentro del menú mobile */}
          <div className="text-sm mt-8">EN | UK | FR</div>
        </nav>
      </div>

      <div className="w-full grow flex">
        <div className="w-full hidden md:block md:w-5/12"></div>

        <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:px-16 lg:px-24 text-background-100">
          <h1 className="text-5xl md:text-7xl font-script drop-shadow-lg leading-none">
            Sacred art
            <span className="block">for the heart's journey</span>
          </h1>

          <p className="text-lg md:text-xl mt-10 font-body">
            Discover healing sounds and words that embrace your soul and fill
            your heart.
          </p>
          <a
            href="#"
            className="group flex items-center gap-2  mt-6 p-2 px-5 rounded-full w-fit transition-all bg-background-100/90 hover:bg-background-100"
          >
            <div className="group-hover:text-primary-500 transition-colors">
              <FaPlay className="h-6 text-secondary-500 group-hover:text-primary-500 text-3xl" />
            </div>
            <span className="text-lg text-primary-500">Listen now</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;