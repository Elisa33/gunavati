import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"; // <--- Importamos el plugin

// Inicializamos el plugin de next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.159"],
};

// Exportamos la configuración envuelta por el plugin de next-intl
export default withNextIntl(nextConfig);
