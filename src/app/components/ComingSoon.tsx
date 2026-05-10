import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { HiMiniEnvelope } from "react-icons/hi2";

export default function ComingSoon() {
  return (
    <main className="min-h-dvh bg-black bg-[url(/img/bg-mobile.jpeg)] md:bg-[url(/img/bg-desktop.png)] bg-cover bg-center flex flex-col md:flex-row text-white w-full overscroll-none">
      {/* Columna principal (Texto y Email) */}
      <div className="w-full md:w-7/12 grow md:grow-0 md:min-h-dvh flex flex-col justify-center p-8 md:px-16 lg:px-24 bg-linear-to-b from-black/60 via-black/40 to-transparent md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent">
        <div>
          <h1 className="text-5xl md:text-7xl font-script drop-shadow-lg leading-tight">
            The heart's journey...
            <span className="block">continues soon</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mt-8 font-body">
            A deeper connection is being crafted.{" "}
            <span className="block md:inline">
              Guanavati will be with you shortly.
            </span>
          </p>

          <p className="text-base md:text-lg text-white/80 mt-8 max-w-md">
            For collaborations, ceremonies, or simply to share light. Reach out
            through e-mail:
          </p>

          {/* Email con hover coherente */}
          <a
            href="mailto:gunavati.art@gmail.com"
            className="group flex items-center gap-4 mt-6 p-3 -m-3 rounded-xl w-fit transition-all hover:bg-white/10"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <HiMiniEnvelope className="text-white text-xl" />
            </div>
            <div className="text-lg md:text-xl font-medium text-white/90 group-hover:text-primary-300 transition-colors">
              gunavati.art@gmail.com
            </div>
          </a>
        </div>
      </div>

      {/* Columna secundaria (Redes Sociales) */}
      {/* 👉 CAMBIO 2: pb-16 en mobile para escapar de la barra de inicio del iPhone. En desktop pb-8 */}
      <div className="w-full md:w-5/12 flex items-end justify-center md:justify-end p-8 pb-16 md:pb-8">
        <div className="flex gap-4">
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
        </div>
      </div>
    </main>
  );
}
