"use client"; // Obligatorio para usar useState (el menú hamburguesa)

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Íconos para el menú

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="hero" className="min-h-screen">
      {/* HEADER: Sticky aplicado acá para que toda la barra quede fija */}
      <header className="sticky top-0 z-50 bg-accent/90 backdrop-blur-md h-16">
        {/* CONTENEDOR CENTRADO: mx-auto centra, w-11/12 da el ancho */}
        <div className="flex items-center justify-between h-full mx-auto w-11/12 max-w-7xl">
          
          {/* Logo */}
          <a href="#hero" className="font-script text-2xl">
            Gunavati
          </a>

          {/* Navegación Desktop (Oculta en mobile) */}
          <nav className="hidden md:flex gap-8">
            <a href="#music" className="hover:text-primary-300 transition-colors">music</a>
            <a href="#about" className="hover:text-primary-300 transition-colors">About</a>
            <a href="#shop" className="hover:text-primary-300 transition-colors">shop</a>
            <a href="#contact" className="hover:text-primary-300 transition-colors">contact</a>
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
        className={`fixed top-0 right-0 h-full w-1/2 bg-secondary z-60 transition-transform duration-300 ease-in-out md:hidden ${
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
        <nav className="flex flex-col items-center justify-center h-3/4 gap-8 text-2xl">
          <a href="#music" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 transition-colors">Music</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 transition-colors">About</a>
          <a href="#shop" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 transition-colors">Shop</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 transition-colors">Contact</a>
          
          {/* Idiomas dentro del menú mobile */}
          <div className="text-sm mt-8">EN | UK | FR</div>
        </nav>
      </div>

      {/* Acá abajo irá el contenido visual del Hero (títulos, imágenes, etc) */}
      
    </section>
  );
};

export default Hero;