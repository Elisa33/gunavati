import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function ThankYou({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("ThankYou");

  return (
    <section className="min-h-dvh flex items-center justify-center bg-background-100 text-primary-700">
      <div className="text-center max-w-lg px-6">
        <h1 className="font-script text-6xl text-primary-600 mb-6">
          {t("title")}
        </h1>
        <p className="text-xl mb-8">
          {t("text1")}
          <span className="block">{t("text2")}</span>
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          {t("back_home")}
        </Link>
      </div>
    </section>
  );
}
