"use client";

import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|ru|fr|uk)/, `/${locale}`);
    return newPath;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-accent/80 backdrop-blur-xs h-16 text-background-100">
        <div className="flex items-center justify-between h-full mx-auto w-11/12 lg:w-10/12 xl:max-w-7xl px-4">
          {/* 1. LOGO (Izquierda) */}
          <a href="#hero" className="font-gunavati text-5xl sm:text-6xl z-10">
            Gunavati
          </a>

          {/* 2. MENÚ CENTRADO (Desktop) */}
          <nav className="hidden lg:flex gap-8 text-lg font-medium items-center absolute left-1/2 -translate-x-1/2">
            <a
              href="#music"
              className="hover:text-secondary-300 transition-colors"
            >
              {t("voice")}
            </a>
            <a
              href="#about"
              className="hover:text-secondary-300 transition-colors"
            >
              {t("story")}
            </a>
            <a
              href="#shop"
              className="hover:text-secondary-300 transition-colors"
            >
              {t("music")}
            </a>
            <a
              href="#support"
              className="hover:text-secondary-300 transition-colors"
            >
              {t("support")}
            </a>
            <a
              href="#contact"
              className="hover:text-secondary-300 transition-colors"
            >
              {t("contact")}
            </a>
          </nav>

          {/* 3. SELECTOR DE IDIOMA (Derecha Desktop / Botón Mobile) */}
          <div className="flex items-center gap-4 z-10">
            {/* Selector Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href={switchLocale("en")}
                className="hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">EN</span>
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href={switchLocale("ru")}
                className="hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">RU</span>
              </Link>
              {/* FR y UK ocultos por el momento
              <span className="text-white/30">|</span>
              <Link
                href={switchLocale("fr")}
                className="hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">FR</span>
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href={switchLocale("uk")}
                className="hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">UK</span>
              </Link>
              */}
            </div>

            {/* Botón Hamburguesa Mobile */}
            <button
              className="lg:hidden text-2xl z-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("close_menu") : t("open_menu")}
            >
              {isMenuOpen ? <IoClose /> : <LuMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-secondary-500 z-60 transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Botón de cerrar arriba */}
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <IoClose />
          </button>
        </div>

        {/* Links del menú */}
        <nav className="flex flex-col items-left justify-start pl-5 text-xl text-primary-600 flex-1">
          <a
            href="#music"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            {t("voice")}
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            {t("story")}
          </a>
          <a
            href="#shop"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            {t("music")}
          </a>
          <a
            href="#support"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            {t("support")}
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-800 transition-colors py-2.5"
          >
            {t("contact")}
          </a>
        </nav>

        {/* SELECTOR DE IDIOMA MOBILE (Abajo del todo) */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Link
              href={switchLocale("en")}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary-800 transition-colors"
            >
              EN
            </Link>
            <span className="text-primary-700/50">|</span>
            <Link
              href={switchLocale("ru")}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary-800 transition-colors"
            >
              RU
            </Link>
            {/* UK y FR ocultos por el momento
            <span className="text-primary-700/50">|</span>
            <Link
              href={switchLocale("uk")}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary-800 transition-colors"
            >
              UK
            </Link>
            <span className="text-primary-700/50">|</span>
            <Link
              href={switchLocale("fr")}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary-800 transition-colors"
            >
              FR
            </Link>
            */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;