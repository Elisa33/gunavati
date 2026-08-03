"use server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createOrder(
  albumTitle: string,
  albumSlug: string,
  buyerEmail: string,
  amount: number,
  paymentMethod: "bank" | "paypal",
) {
  const code = "GV-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  const { error } = await supabase.from("orders").insert([
    {
      code: code,
      album_slug: albumSlug,
      buyer_email: buyerEmail,
      status: "pending",
    },
  ]);

  if (error) {
    console.error("Error saving to Supabase:", error);
    return { success: false, message: "Error creating order" };
  }

  // Textos de pago según el método elegido
  const paymentDetails =
    paymentMethod === "paypal"
      ? `<li><strong>PayPal:</strong><br/>Please log in to your PayPal account and send €${amount} to this email: <strong>belotel13@gmail.com</strong><br/><br/><a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background: #0070ba; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to PayPal</a></li>`
      : `<li><strong>Bank Transfer (Russia):</strong><br/>Phone: +79819564314 <br/>Name: Михаил А.<br/>Account: Райффайзен</li>`;

  // Email al comprador
  await resend.emails.send({
    from: "Gunavati Music <noreply@gunavati.art>",
    to: buyerEmail,
    subject: `Your payment instructions for ${albumTitle}`,
    html: `
      <h2>Just one step left!</h2>
      <p>To complete your order for <strong>${albumTitle}</strong>, please transfer <strong>€${amount}</strong> using the method you selected:</p>
      <ul>${paymentDetails}</ul>
      <p><strong>IMPORTANT: Include this code in the transfer comment so we can identify you:</strong></p>
      <h1 style="color:blue; letter-spacing: 2px;">${code}</h1>
      <p>Once we confirm the transfer, we will send the download links directly to this email address.</p>
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
  if (data.album_slug === "donation") {
    await resend.emails.send({
      from: "Gunavati Music <noreply@gunavati.art>",
      to: data.buyer_email,
      subject: `Thank you for your donation!`,
      html: `
        <h2>We received your donation!</h2>
        <p>Thank you so much for your support. Your generosity helps sustain this creative offering and allows new songs to come into being.</p>
        <p>With love,<br/>Gunavati</p>
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
      subject: `Your download links for ${album.title}`,
      html: `
        <h2>Thank you for your support!</h2>
        <p>Your payment has been confirmed. Here are your download links for <strong>${album.title}</strong>:</p>
        <div style="margin: 20px 0;">
          ${album.links.map((link) => `<a href="${link.url}" style="display: inline-block; padding: 10px 20px; background: #5E7F45; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">${link.name}</a>`).join("")}
        </div>
        <p>Thank you for respecting copyright and not sharing this link with anyone.</p>
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
) {
  const code = "DN-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  // Guardamos en Supabase con el slug "donation"
  const { error } = await supabase.from("orders").insert([
    {
      code: code,
      album_slug: "donation", // Identificador especial
      buyer_email: buyerEmail,
      status: "pending",
    },
  ]);

  if (error) {
    return { success: false, message: "Error creating donation" };
  }

  const paymentDetails =
    paymentMethod === "paypal"
      ? `<li><strong>PayPal:</strong><br/>Please log in to your PayPal account and send €${amount} to this email: <strong>belotel13@gmail.com</strong><br/><br/><a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background: #0070ba; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to PayPal</a></li>`
      : `<li><strong>Bank Transfer (Russia):</strong><br/>Phone: +79819564314 <br/>Name: Михаил А.<br/>Account: Райффайзен</li>`;

  // Email al donante
  await resend.emails.send({
    from: "Gunavati Music <noreply@gunavati.art>",
    to: buyerEmail,
    subject: `Your donation instructions`,
    html: `
      <h2>Thank you for your support!</h2>
      <p>To complete your donation of <strong>€${amount}</strong>, please send it using the method you selected:</p>
      <ul>${paymentDetails}</ul>
      <p><strong>IMPORTANT: Include this code in the transfer comment so we can identify you:</strong></p>
      <h1 style="color:blue; letter-spacing: 2px;">${code}</h1>
      <p>We will confirm receipt shortly. Thank you for keeping this music alive!</p>
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