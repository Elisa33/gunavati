"use client";
import React, { useState } from "react";
import { FaPaypal, FaTimes } from "react-icons/fa"; // Agregamos FaTimes para el modal

const donationAmounts = [5, 10, 20, 50];

// ⚠️ IMPORTANTE: Cambiá esto al email real de PayPal de tu clienta
// para que los montos dinámicos y la página de retorno funcionen.
const PAYPAL_EMAIL = "belotel13@gmail.com"; 

const Support = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = (amount: number) => {
    // Usamos el formato CGI estándar de PayPal (no el hosted button)
    // para poder pasarle el monto exacto y la URL de retorno
    const params = new URLSearchParams({
      cmd: "_donations",
      business: PAYPAL_EMAIL,
      item_name: "Support the vision - Gunavati",
      amount: amount.toString(),
      currency_code: "EUR",
      // Aquí le decimos a PayPal que vuelva a tu sitio al terminar
      return: `${window.location.origin}/thank-you`,
    });

    window.open(
      `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
    setIsDonateOpen(false);
  };

  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount);
    // El mínimo es 1, como pediste
    if (amount >= 1) {
      handleDonate(amount);
    }
  };

  return (
    <>
      <section id="support" className="relative py-24 bg-secondary-100 text-primary-700">
        <div className="mx-auto w-11/12 max-w-4xl text-center">
          <span className="uppercase lg:text-lg text-primary-600 tracking-wider">
            keep this music alive
          </span>
          <h2 className="font-script text-7xl text-primary-700 -translate-y-4 mt-2 p-4">
            Support the vision
          </h2>
          <p className="text-lg max-w-xl mx-auto mt-6 text-primary-600">
            If this work resonates with you and supports your own inner journey,
            your contribution helps sustain this creative offering and allows new
            songs, poems, recordings, and projects to come into being.
          </p>
          
          {/* Botón único que abre el modal */}
          <button
            onClick={() => setIsDonateOpen(true)}
            className="mt-10 flex items-center gap-3 mx-auto px-8 py-3 rounded-full bg-primary-700 text-white text-lg font-semibold hover:bg-primary-600 transition-colors shadow-md"
          >
            Donate
          </button>
        </div>
      </section>

      {/* Modal de Donación */}
      {isDonateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsDonateOpen(false)} // Cerrar al tocar fuera
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-primary-700"
            onClick={(e) => e.stopPropagation()} // Evitar que se cierre al tocar el modal
          >
            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 text-primary-400 hover:text-primary-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h3 className="font-script text-4xl text-primary-600 mb-1">
              Support the vision
            </h3>
            <p className="text-sm text-primary-400 mb-6">
              Choose an amount — minimum €1
            </p>

            {/* Botones de montos predefinidos */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleDonate(amount)}
                  className="py-3 rounded-xl border-2 border-primary-200 text-primary-600 font-semibold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all"
                >
                  €{amount}
                </button>
              ))}
            </div>

            {/* Input para monto personalizado */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                  €
                </span>
                <input
                  type="number"
                  min={1}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Other amount"
                  className="w-full pl-8 pr-3 py-3 rounded-xl border-2 border-primary-200 text-primary-600 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <button
                onClick={handleCustomDonate}
                disabled={!customAmount || parseFloat(customAmount) < 1}
                className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Give
              </button>
            </div>

            <p className="text-xs text-primary-300 mt-4 flex items-center gap-1">
              <FaPaypal />
              Opens PayPal — no account needed, card accepted
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Support;