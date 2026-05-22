import ComingSoon from "../app/components/ComingSoon";

export default function Home() {
  const showComingSoon = true;

  if (showComingSoon) {
    return <ComingSoon />;
  }

  return (
    <main className="min-h-dvh bg-surface-50">
      <h1 className="text-4xl text-primary-500">¡Acá va el sitio real!</h1>
      <p>Empezá a maquetar tu one-page acá...</p>
    </main>
  );
}
