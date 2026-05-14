
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
          src="/img/contact-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>
      <div className="mx-auto w-11/12 max-w-7xl pt-12 md:pt-20 pb-8 text-background-100">
        <div className="flex flex-col items-center">
          <span className="uppercase text-lg">GET IN TOUCH</span>
          <h3 className="font-lavishly-yours text-8xl -translate-y-4 text-secondary-500">
            let’s connect
          </h3>
          <p className="md:w-2/3 text-center">
            For collaborations, ceremonies, or simply to share light.
            <span className="block">Reach out through e-mail:</span>
          </p>
          <a
            href="mailto:gunavati.art@gmail.com"
            className="group flex items-center gap-4 p-3 -m-3 rounded-xl w-fit transition-all hover:bg-white/10"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <HiMiniEnvelope className="text-white text-xl" />
            </div>
            <div className="text-lg md:text-xl font-medium text-white/90 group-hover:text-primary-300 transition-colors">
              gunavati.art@gmail.com
            </div>
          </a>
        </div>
        <div className=" flex items-center justify-center p-8 py-16 md:pb-8">
          <div className="flex gap-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/gunavati_kyiv?igsh=MW5lcXVscnNvZHFqMg==&utm_source=ig_contact_invite"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all"
            >
              <FaInstagram className="text-white text-xl" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1XVn8Uu1ps/?mibextid=wwXIfr"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all"
            >
              <FaFacebookF className="text-white text-xl" />
            </a>

            {/* youtube */}
            <a
              href="https://youtube.com/@gunavati?si=4ldPCVEB3AwiCrUo"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all"
            >
              <FaYoutube className="text-white text-xl" />
            </a>
            {/* apple music */}
            <a
              href="https://youtube.com/@gunavati?si=4ldPCVEB3AwiCrUo"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all"
            >
              <BsAppleMusic className="text-white text-xl" />
            </a>
            {/* spotify */}
            <a
              href="https://youtube.com/@gunavati?si=4ldPCVEB3AwiCrUo"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all"
            >
              <FaSpotify className="text-white text-xl" />
            </a>
          </div>
        </div>
        <p className="text-center pt-12">
          © 2026 Gunavati. Made with ✦ by Elisa
        </p>
      </div>
    </section>
  );
}

export default Contact