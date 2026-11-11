"use server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  getEmailStrings,
  linkLabel,
  normalizeLocale,
  paymentDetailsHtml,
} from "./emailTemplates";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Guarda el pedido con el idioma del comprador. Si la columna `locale` aún no
// existe en la tabla, reintenta sin ella para no romper la compra.
async function insertOrder(row: Record<string, string>, locale: string) {
  const first = await supabase.from("orders").insert([{ ...row, locale }]);
  if (!first.error) return first;
  console.warn("Insert with locale failed, retrying without:", first.error);
  return supabase.from("orders").insert([row]);
}

export async function createOrder(
  albumTitle: string,
  albumSlug: string,
  buyerEmail: string,
  amount: number,
  paymentMethod: "bank" | "paypal",
  locale: string = "en",
) {
  const loc = normalizeLocale(locale);
  const code = "GV-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  const { error } = await insertOrder(
    {
      code: code,
      album_slug: albumSlug,
      buyer_email: buyerEmail,
      status: "pending",
    },
    loc,
  );

  if (error) {
    console.error("Error saving to Supabase:", error);
    return { success: false, message: "Error creating order" };
  }

  const m = getEmailStrings(loc);

  // Email al comprador (en su idioma)
  await resend.emails.send({
    from: "Gunavati Music <noreply@gunavati.art>",
    to: buyerEmail,
    subject: m.orderSubject(albumTitle),
    html: `
      <h2>${m.orderHeading}</h2>
      <p>${m.orderIntro(albumTitle, amount)}</p>
      <ul>${paymentDetailsHtml(m, paymentMethod, amount)}</ul>
      <p><strong>${m.important}</strong></p>
      <h1 style="color:blue; letter-spacing: 2px;">${code}</h1>
      <p>${m.orderFooter}</p>
    `,
  });

  // Email a Kateryna (Inglés) + Copia oculta a Elisa
  await resend.emails.send({
    from: "Gunavati Web <noreply@gunavati.art>",
    to: "belotel13@gmail.com", // <--- Poné acá el email real de Kateryna
    bcc: "elisablange.tdf@gmail.com", // <--- Vos recibís copia oculta para monitorear
    subject: `New Pending Payment (${paymentMethod.toUpperCase()}): ${code} (€${amount})`,
    html: `
      <h2>Heads up!</h2>
      <p>The user <strong>${buyerEmail}</strong> is about to send you <strong>€${amount}</strong> for the album <strong>${albumTitle}</strong>.</p>
      <p>Payment method chosen: <strong>${paymentMethod === "bank" ? "Russia Bank Transfer" : "PayPal"}</strong></p>
      <p>Please keep an eye on your accounts in the next few hours for this code:</p>
      <h1 style="color:green;">${code}</h1>
    `,
  });

  return { success: true, message: "Instructions sent!", code: code };
}

// La estructura de los links de descarga (la misma que usaremos en la web)
const downloadLinks: Record<
  string,
  { title: string; links: { name: string; url: string }[] }
> = {
  "my-only-hope": {
    title: "My Only Hope",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/My-Only-Hope-MP3.zip",
      }, // Reemplazá # con el link real
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "the-light-of-awakening": {
    title: "The Light of Awakening",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/The-Light-Of-Awakening-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "a-new-world": {
    title: "A New World",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/A-New-World-Kiirtan.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  again: {
    title: "Again",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Again-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "kirtan-live-ananda-gaori": {
    title: "Kirtan Live Ananda Gaori",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kirtan-Live-AG-MP3.zip",
      },
      /*{ name: "Download FLAC", url: "#" },*/
    ],
  },
  "tamasacchanna-dharay": {
    title: "Tamasácchanna Dharáy",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-MP3.zip",
      },
      {
        name: "Download M4A",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/PS3530-Tamasacchanna-Dharay-M4A.zip",
      },
    ],
  },
  "kirtan-for-the-journey-within": {
    title: "Kirtan for The Journey Within",
    links: [
      {
        name: "Download MP3",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kiirtan-for-The-Journey-Within-MP3.zip",
      },
      /*{
        name: "Download M4A",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Kiirtan-for-The-Journey-Within-M4A.zip",
      },*/
    ],
  },
  "full-discography": {
    title: "The Complete Discography",
    links: [
      {
        name: "Download All Albums (MP3)",
        url: "https://pub-50f444247ef14eb0a9c838b46185174d.r2.dev/Full-Discography-mp3.zip",
      },
      /*{ name: "Download All Albums (FLAC)", url: "#" },*/
    ],
  },
};

export async function validateOrder(code: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error || !data) {
    return { success: false, message: "Code not found." };
  }

  if (data.status === "completed") {
    return { success: false, message: "This code has already been used." };
  }

  // Si es una donación, mandamos un email de agradecimiento
  const m = getEmailStrings(data.locale);
  if (data.album_slug === "donation") {
    await resend.emails.send({
      from: "Gunavati Music <noreply@gunavati.art>",
      to: data.buyer_email,
      subject: m.thanksDonationSubject,
      html: `
        <h2>${m.thanksDonationHeading}</h2>
        <p>${m.thanksDonationBody}</p>
        <p>${m.withLove}<br/>Gunavati</p>
      `,
    });
  } else {
    // Si es un álbum, mandamos los links de descarga
    const album = downloadLinks[data.album_slug];
    if (!album) {
      return { success: false, message: "Error: Album not found." };
    }

    await resend.emails.send({
      from: "Gunavati Music <noreply@gunavati.art>",
      to: data.buyer_email,
      subject: m.downloadSubject(album.title),
      html: `
        <h2>${m.downloadHeading}</h2>
        <p>${m.downloadIntro(album.title)}</p>
        <div style="margin: 20px 0;">
          ${album.links.map((link) => `<a href="${link.url}" style="display: inline-block; padding: 10px 20px; background: #5E7F45; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">${linkLabel(m, link.name)}</a>`).join("")}
        </div>
        <p>${m.copyright}</p>
      `,
    });
  }

  // Marcar como completada
  await supabase
    .from("orders")
    .update({ status: "completed" })
    .eq("code", code.toUpperCase());

  return { success: true, message: `Confirmation sent to ${data.buyer_email}` };
}

export async function createDonationOrder(
  buyerEmail: string,
  amount: number,
  paymentMethod: "bank" | "paypal",
  locale: string = "en",
) {
  const loc = normalizeLocale(locale);
  const code = "DN-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  // Guardamos en Supabase con el slug "donation"
  const { error } = await insertOrder(
    {
      code: code,
      album_slug: "donation", // Identificador especial
      buyer_email: buyerEmail,
      status: "pending",
    },
    loc,
  );

  if (error) {
    return { success: false, message: "Error creating donation" };
  }

  const m = getEmailStrings(loc);

  // Email al donante (en su idioma)
  await resend.emails.send({
    from: "Gunavati Music <noreply@gunavati.art>",
    to: buyerEmail,
    subject: m.donationSubject,
    html: `
      <h2>${m.donationHeading}</h2>
      <p>${m.donationIntro(amount)}</p>
      <ul>${paymentDetailsHtml(m, paymentMethod, amount)}</ul>
      <p><strong>${m.important}</strong></p>
      <h1 style="color:blue; letter-spacing: 2px;">${code}</h1>
      <p>${m.donationFooter}</p>
    `,
  });

  // Email a Kateryna
  await resend.emails.send({
    from: "Gunavati Web <noreply@gunavati.art>",
    to: "belotel13@gmail.com", // Email de Kateryna
    bcc: "elisablange.tdf@gmail.com", // Vos en copia oculta
    subject: `New Pending Donation (${paymentMethod.toUpperCase()}): ${code} (€${amount})`,
    html: `
      <h2>Heads up!</h2>
      <p>The user <strong>${buyerEmail}</strong> wants to send you a donation of <strong>€${amount}</strong>.</p>
      <p>Method: <strong>${paymentMethod === "bank" ? "Russia Bank" : "PayPal"}</strong></p>
      <p>Look out for this code:</p>
      <h1 style="color:green;">${code}</h1>
    `,
  });

  return { success: true, message: "Donation instructions sent!", code: code };
}