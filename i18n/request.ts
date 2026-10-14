import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Obtenemos el idioma de la URL (lo que nos manda el proxy.ts)
  const locale = await requestLocale;

  // 2. Si por algún motivo no hay idioma, usamos inglés por defecto
  const validLocale = locale || "en";

  return {
    locale: validLocale,
    // 3. Cargamos el archivo JSON correspondiente
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});