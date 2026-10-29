import { createClient } from "@supabase/supabase-js";

// Lo llama el cron de Vercel (ver vercel.json) para que Supabase no pause el proyecto por inactividad
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("orders")
    .select("id", { head: true, count: "exact" });

  if (error) {
    const message = error.message || "Supabase no responde (¿proyecto pausado?)";
    console.error("keepalive: Supabase error", message);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }

  return Response.json({ ok: true, at: new Date().toISOString() });
}
