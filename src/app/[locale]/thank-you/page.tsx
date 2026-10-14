import Link from "next/link";

export default function ThankYou() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background-100 text-primary-700">
      <div className="text-center max-w-lg px-6">
        <h1 className="font-script text-6xl text-primary-600 mb-6">
          Thank you
        </h1>
        <p className="text-xl mb-8">
          Your generosity helps keep this music alive.
          <span className="block">
            May it return to you in harmony and peace.
          </span>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}