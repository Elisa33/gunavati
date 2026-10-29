import Image from "next/image";
import { getTranslations } from "next-intl/server";

const About = async () => {
  const t = await getTranslations("About");

  return (
    <section
      id="about"
      className="relative min-h-dvh bg-primary-500 text-white overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>

      <div className="relative grid sm:grid-cols-2 gap-6 md:gap-0 mx-auto max-w-7xl py-20 px-6">
        {/* Image wrapper con alto controlado - Ajustado justify para mobile/desktop */}
        <div className="max-h-[80dvh] flex justify-center md:justify-end rounded-3xl overflow-hidden">
          {/* Imagen Mobile (Oculta en desktop) */}
          <Image
            src="/img/about-image-mobile.webp"
            alt="Gunavati portrait"
            width={424}
            height={540}
            className="h-full w-auto rounded-3xl sm:hidden"
          />

          {/* Imagen Desktop (Oculta en mobile) */}
          <Image
            src="/img/about-image.webp"
            alt="Gunavati portrait"
            width={424}
            height={540}
            className="h-full w-auto object-cover rounded-3xl hidden sm:block"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center md:px-12 py-4 md:py-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col max-w-7xl">
              <span className="uppercase lg:text-lg text-background-100">
                {t("tag")}
              </span>
              <h2 className="font-script font-subtitle text-7xl md:text-8xl md:max-lg:[.lang-ru_&]:text-[clamp(48px,calc((50vw-124px)/3.98),96px)] text-secondary-500">
                {t("title")}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="lg:text-lg leading-7">{t("paragraph1")}</p>
              <p className="lg:text-lg leading-7">{t("paragraph2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
