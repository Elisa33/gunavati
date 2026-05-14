"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-accent/80 backdrop-blur-xs h-16 text-background-100">
        <div className="flex items-center justify-between h-full mx-auto w-11/12 max-w-7xl">
          {/* Logo */}
          <a href="#hero" className="font-gunavati text-5xl md:text-6xl">
            Gunavati
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 text-lg font-medium">
            <a
              href="#music"
              className="hover:text-secondary-400 transition-colors"
            >
              my voice
            </a>
            <a
              href="#about"
              className="hover:text-secondary-400 transition-colors"
            >
              my story
            </a>
            <a
              href="#shop"
              className="hover:text-secondary-400 transition-colors"
            >
              my vision
            </a>
            <a
              href="#contact"
              className="hover:text-secondary-400 transition-colors"
            >
              contact
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-sm">EN | UK | FR</div>

            <button
              className="md:hidden text-2xl z-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-secondary-500 z-60 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-3/4 gap-8 text-2xl text-primary-600">
          <a
            href="#music"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            my voice
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            my story
          </a>
          <a
            href="#shop"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            my vision
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors"
          >
            contact
          </a>

          <div className="text-sm mt-8">EN | UK | FR</div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;