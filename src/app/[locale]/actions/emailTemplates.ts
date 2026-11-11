// Textos de los correos al comprador/donante, por idioma.
// (Los correos internos a Kateryna se quedan en inglés en orderActions.ts)

export type EmailLocale = "en" | "ru" | "uk" | "fr";

export function normalizeLocale(locale?: string | null): EmailLocale {
  return locale === "ru" || locale === "uk" || locale === "fr" ? locale : "en";
}

type Strings = {
  paypalTitle: string;
  paypalText: (amount: number) => string;
  paypalBtn: string;
  bankTitle: string;
  bankPhone: string;
  bankName: string;
  bankAccount: string;
  important: string;
  // pedido de álbum
  orderSubject: (album: string) => string;
  orderHeading: string;
  orderIntro: (album: string, amount: number) => string;
  orderFooter: string;
  // donación
  donationSubject: string;
  donationHeading: string;
  donationIntro: (amount: number) => string;
  donationFooter: string;
  // confirmaciones
  thanksDonationSubject: string;
  thanksDonationHeading: string;
  thanksDonationBody: string;
  withLove: string;
  downloadSubject: (album: string) => string;
  downloadHeading: string;
  downloadIntro: (album: string) => string;
  copyright: string;
  downloadLabel: string;
  downloadAllLabel: string;
};

const strings: Record<EmailLocale, Strings> = {
  en: {
    paypalTitle: "PayPal",
    paypalText: (a) =>
      `Please log in to your PayPal account and send €${a} to this email:`,
    paypalBtn: "Go to PayPal",
    bankTitle: "Bank Transfer (Russia)",
    bankPhone: "Phone",
    bankName: "Name",
    bankAccount: "Account",
    important:
      "IMPORTANT: Include this code in the transfer comment so we can identify you:",
    orderSubject: (al) => `Your payment instructions for ${al}`,
    orderHeading: "Just one step left!",
    orderIntro: (al, a) =>
      `To complete your order for <strong>${al}</strong>, please transfer <strong>€${a}</strong> using the method you selected:`,
    orderFooter:
      "Once we confirm the transfer, we will send the download links directly to this email address.",
    donationSubject: "Your donation instructions",
    donationHeading: "Thank you for your support!",
    donationIntro: (a) =>
      `To complete your donation of <strong>€${a}</strong>, please send it using the method you selected:`,
    donationFooter:
      "We will confirm receipt shortly. Thank you for keeping this music alive!",
    thanksDonationSubject: "Thank you for your donation!",
    thanksDonationHeading: "We received your donation!",
    thanksDonationBody:
      "Thank you so much for your support. Your generosity helps sustain this creative offering and allows new songs to come into being.",
    withLove: "With love,",
    downloadSubject: (al) => `Your download links for ${al}`,
    downloadHeading: "Thank you for your support!",
    downloadIntro: (al) =>
      `Your payment has been confirmed. Here are your download links for <strong>${al}</strong>:`,
    copyright:
      "Thank you for respecting copyright and not sharing this link with anyone.",
    downloadLabel: "Download",
    downloadAllLabel: "Download All Albums",
  },
  ru: {
    paypalTitle: "PayPal",
    paypalText: (a) =>
      `Войдите в свой аккаунт PayPal и отправьте €${a} на этот адрес:`,
    paypalBtn: "Перейти в PayPal",
    bankTitle: "Банковский перевод (Россия)",
    bankPhone: "Телефон",
    bankName: "Имя",
    bankAccount: "Счет",
    important:
      "ВАЖНО: Укажите этот код в комментарии к переводу, чтобы мы могли вас идентифицировать:",
    orderSubject: (al) => `Инструкции по оплате: ${al}`,
    orderHeading: "Остался всего один шаг!",
    orderIntro: (al, a) =>
      `Чтобы завершить заказ <strong>${al}</strong>, переведите <strong>€${a}</strong> выбранным способом:`,
    orderFooter:
      "Как только мы подтвердим перевод, ссылки для скачивания придут на этот адрес автоматически.",
    donationSubject: "Инструкции для пожертвования",
    donationHeading: "Спасибо за вашу поддержку!",
    donationIntro: (a) =>
      `Чтобы завершить пожертвование в размере <strong>€${a}</strong>, отправьте его выбранным способом:`,
    donationFooter:
      "Мы скоро подтвердим получение. Спасибо, что помогаете этой музыке жить!",
    thanksDonationSubject: "Спасибо за ваше пожертвование!",
    thanksDonationHeading: "Мы получили ваше пожертвование!",
    thanksDonationBody:
      "Огромное спасибо за поддержку. Ваша щедрость помогает продолжать это творчество и дарит жизнь новым песням.",
    withLove: "С любовью,",
    downloadSubject: (al) => `Ссылки для скачивания: ${al}`,
    downloadHeading: "Спасибо за вашу поддержку!",
    downloadIntro: (al) =>
      `Ваш платёж подтверждён. Вот ссылки для скачивания <strong>${al}</strong>:`,
    copyright:
      "Спасибо, что уважаете авторские права и не делитесь этой ссылкой ни с кем.",
    downloadLabel: "Скачать",
    downloadAllLabel: "Скачать все альбомы",
  },
  uk: {
    paypalTitle: "PayPal",
    paypalText: (a) =>
      `Увійдіть у свій акаунт PayPal і надішліть €${a} на цю адресу:`,
    paypalBtn: "Перейти до PayPal",
    bankTitle: "Банківський переказ (Росія)",
    bankPhone: "Телефон",
    bankName: "Ім'я",
    bankAccount: "Рахунок",
    important:
      "ВАЖЛИВО: Вкажіть цей код у коментарі до переказу, щоб ми могли вас ідентифікувати:",
    orderSubject: (al) => `Інструкції з оплати: ${al}`,
    orderHeading: "Залишився лише один крок!",
    orderIntro: (al, a) =>
      `Щоб завершити замовлення <strong>${al}</strong>, переведіть <strong>€${a}</strong> обраним способом:`,
    orderFooter:
      "Щойно ми підтвердимо переказ, посилання для завантаження надійдуть на цю адресу автоматично.",
    donationSubject: "Інструкції для пожертви",
    donationHeading: "Дякуємо за вашу підтримку!",
    donationIntro: (a) =>
      `Щоб завершити пожертву в розмірі <strong>€${a}</strong>, надішліть її обраним способом:`,
    donationFooter:
      "Ми незабаром підтвердимо отримання. Дякуємо, що допомагаєте цій музиці жити!",
    thanksDonationSubject: "Дякуємо за вашу пожертву!",
    thanksDonationHeading: "Ми отримали вашу пожертву!",
    thanksDonationBody:
      "Щиро дякуємо за підтримку. Ваша щедрість допомагає продовжувати цю творчість і дарує життя новим пісням.",
    withLove: "З любов'ю,",
    downloadSubject: (al) => `Посилання для завантаження: ${al}`,
    downloadHeading: "Дякуємо за вашу підтримку!",
    downloadIntro: (al) =>
      `Ваш платіж підтверджено. Ось посилання для завантаження <strong>${al}</strong>:`,
    copyright:
      "Дякуємо, що поважаєте авторські права і не ділитеся цим посиланням ні з ким.",
    downloadLabel: "Завантажити",
    downloadAllLabel: "Завантажити всі альбоми",
  },
  fr: {
    paypalTitle: "PayPal",
    paypalText: (a) =>
      `Connecte-toi à ton compte PayPal et envoie €${a} à cette adresse :`,
    paypalBtn: "Aller sur PayPal",
    bankTitle: "Virement bancaire (Russie)",
    bankPhone: "Téléphone",
    bankName: "Nom",
    bankAccount: "Compte",
    important:
      "IMPORTANT : Indique ce code dans le commentaire du virement pour que nous puissions t'identifier :",
    orderSubject: (al) => `Tes instructions de paiement pour ${al}`,
    orderHeading: "Plus qu'une étape !",
    orderIntro: (al, a) =>
      `Pour finaliser ta commande de <strong>${al}</strong>, envoie <strong>€${a}</strong> avec le moyen de paiement choisi :`,
    orderFooter:
      "Dès que nous aurons confirmé le virement, les liens de téléchargement seront envoyés automatiquement à cette adresse.",
    donationSubject: "Tes instructions pour le don",
    donationHeading: "Merci pour ton soutien !",
    donationIntro: (a) =>
      `Pour finaliser ton don de <strong>€${a}</strong>, envoie-le avec le moyen de paiement choisi :`,
    donationFooter:
      "Nous confirmerons la réception très bientôt. Merci de faire vivre cette musique !",
    thanksDonationSubject: "Merci pour ton don !",
    thanksDonationHeading: "Nous avons bien reçu ton don !",
    thanksDonationBody:
      "Merci infiniment pour ton soutien. Ta générosité permet de poursuivre cette offrande créative et de donner naissance à de nouvelles chansons.",
    withLove: "Avec amour,",
    downloadSubject: (al) => `Tes liens de téléchargement pour ${al}`,
    downloadHeading: "Merci pour ton soutien !",
    downloadIntro: (al) =>
      `Ton paiement est confirmé. Voici tes liens de téléchargement pour <strong>${al}</strong> :`,
    copyright:
      "Merci de respecter le droit d'auteur et de ne partager ce lien avec personne.",
    downloadLabel: "Télécharger",
    downloadAllLabel: "Télécharger tous les albums",
  },
};

export function getEmailStrings(locale?: string | null): Strings {
  return strings[normalizeLocale(locale)];
}

export function paymentDetailsHtml(
  s: Strings,
  method: "bank" | "paypal",
  amount: number,
) {
  return method === "paypal"
    ? `<li><strong>${s.paypalTitle}:</strong><br/>${s.paypalText(amount)} <strong>belotel13@gmail.com</strong><br/><br/><a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background: #0070ba; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">${s.paypalBtn}</a></li>`
    : `<li><strong>${s.bankTitle}:</strong><br/>${s.bankPhone}: +79819564314 <br/>${s.bankName}: Михаил А.<br/>${s.bankAccount}: Райффайзен</li>`;
}

// "Download MP3" -> "Скачать MP3", "Download All Albums (MP3)" -> "Скачать все альбомы (MP3)"
export function linkLabel(s: Strings, name: string) {
  return name
    .replace("Download All Albums", s.downloadAllLabel)
    .replace("Download", s.downloadLabel);
}
