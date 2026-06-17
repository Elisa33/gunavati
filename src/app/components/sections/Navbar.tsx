"use client";

import React, { useState } from "react";
//import { FaBars, FaTimes } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-accent/80 backdrop-blur-xs h-16 text-background-100">
        <div className="flex items-center justify-between h-full mx-auto w-11/12 lg:w-10/12 xl:max-w-7xl px-4">
          {/* Logo */}
          <a href="#hero" className="font-gunavati text-5xl sm:text-6xl">
            Gunavati
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-8 text-lg font-medium">
            <a
              href="#music"
              className="hover:text-secondary-300 transition-colors"
            >
              my voice
            </a>
            <a
              href="#about"
              className="hover:text-secondary-300 transition-colors"
            >
              my story
            </a>
            <a
              href="#shop"
              className="hover:text-secondary-300 transition-colors"
            >
              my music
            </a>
            <a
              href="#support"
              className="hover:text-secondary-300 transition-colors"
            >
              support
            </a>
            <a
              href="#contact"
              className="hover:text-secondary-300 transition-colors"
            >
              contact me
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6 ">
            <div className="hidden text-sm">EN | UK | FR</div>

            <button
              className="lg:hidden text-2xl z-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <IoClose /> : <LuMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-secondary-500 z-60 transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col items-left justify-start pl-5 text-xl text-primary-600">
          <a
            href="#music"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            my voice
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            my story
          </a>
          <a
            href="#shop"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            my music
          </a>
          <a
            href="#support"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            support
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            contact me
          </a>

          <div className="text-sm mt-8 invisible">EN | UK | FR</div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;