
import React from 'react'
import Image from "next/image";
import { HiMiniEnvelope } from "react-icons/hi2";
import { BsAppleMusic } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative bg-primary-600 text-white overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/contact-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>
      <div className="relative mx-auto w-11/12 max-w-7xl pt-12 md:pt-20 pb-8 text-background-100 px-6 z-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase text-lg">GET IN TOUCH</span>
          <h3 className="font-lavishly-yours text-7xl text-secondary-500">
            let’s connect
          </h3>
          <p className="md:w-2/3 md:text-lg text-center">
            <span className="block ms:inline">For collaborations,</span> events,
            or simply to share light.
            <span className="block">Reach out through e-mail:</span>
          </p>
          <a
            href="mailto:gunavati.art@gmail.com"
            aria-label="Send email"
            className="group flex items-center gap-4 py-2 px-4 rounded-xl w-fit transition-all hover:bg-white/20 mt-4"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <HiMiniEnvelope className="text-white text-xl" />
            </div>
            <div className="text-lg md:text-xl font-medium text-secondary-500 transition-colors">
              gunavati.art@gmail.com
            </div>
          </a>
        </div>
        <div className=" flex items-center justify-center p-8 py-16 md:pb-8">
          <div className="flex gap-6">
            {/* spotify */}
            <a
              href="https://open.spotify.com/artist/7oIXVcqgLhHQFudWozZAIU?si=MsL-VwTDTD-pRx4BNwh8ZQ"
              aria-label="Listen on Spotify"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary-500/80 hover:scale-110 transition-all"
            >
              <FaSpotify className="text-white text-xl" />
            </a>
            {/* youtube */}
            <a
              href="https://youtube.com/@gunavati?si=4ldPCVEB3AwiCrUo"
              aria-label="Watch on You tube"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary-500/80 hover:scale-110 transition-all"
            >
              <FaYoutube className="text-white text-xl" />
            </a>
            {/* apple music */}
            <a
              href="https://music.apple.com/ua/artist/gunavati/1768795053?l=ru"
              aria-label="Listen on Apple music"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary-500/80 hover:scale-110 transition-all"
            >
              <BsAppleMusic className="text-white text-xl" />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/gunavati_kyiv?igsh=MW5lcXVscnNvZHFqMg==&utm_source=ig_contact_invite"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary-500/80 hover:scale-110 transition-all"
            >
              <FaInstagram className="text-white text-xl" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1XVn8Uu1ps/?mibextid=wwXIfr"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary-500/80 hover:scale-110 transition-all"
            >
              <FaFacebookF className="text-white text-xl" />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center text-center gap-1 w-full pt-12 text-sm">
          <p>© 2026 Gunavati.</p>
          <p className="text-white"> Made with </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 mx-1 animate-bounce"
          >
            <path
              fillRule="evenodd"
              d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-white">by</p>
          <a
            href="https://elisa33.github.io/portfolio-all/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-500 hover:text-secondary-300 hover:underline transition-colors"
            aria-label="Portfolio Elisa"
          >
            Elisa
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact