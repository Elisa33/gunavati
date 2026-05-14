"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPaypal, FaTimes } from "react-icons/fa";

const donationAmounts = [5, 10, 20, 50];

const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=G8J5W73XEY5TY";

const About = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = (amount: number) => {
    window.open(
      `${PAYPAL_URL}&amount=${amount}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsDonateOpen(false);
  };

  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      handleDonate(amount);
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-dvh bg-primary-500 text-white overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>

      <div className="relative grid md:grid-cols-2 mx-auto w-11/12 max-w-7xl py-20">
        {/* Image wrapper con alto controlado */}
        <div className="max-h-[80vh] flex justify-end rounded-3xl overflow-hidden">
          <Image
            src="/img/about-image.webp"
            alt=""
            width={424}
            height={540}
            className="h-full w-auto rounded-3xl"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between px-6 md:px-16 py-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-11/12 max-w-7xl">
              <span className="uppercase text-lg text-background-100">
                about me
              </span>
              <h2 className="font-lavishly-yours text-8xl -translate-y-8 text-secondary-500">
                my story
              </h2>
            </div>
            <p className="text-xl leading-8">
              Gunavati is a weaver of sattvic art, spiritual music and poetry
              born from sacred practice. Her compositions quiet the mind and
              awaken universal love. Through her work, consciousness rises and
              attention turns inward, toward your deepest truth, toward home.
            </p>
          </div>

          {/* Donate section */}
          <div className="flex flex-col gap-4 mt-10">
            <p className="text-lg">
              Her music is a gift. If it has provided you calm, harmony, or
              connection, donations help sustain this spiritual work.
            </p>
            <button
              onClick={() => setIsDonateOpen(true)}
              className="group flex items-center gap-3 p-2 px-5 rounded-full w-fit transition-all bg-background-100/90 hover:bg-background-100"
            >
              <FaPaypal className="h-5 text-secondary-500 group-hover:text-primary-500 text-2xl transition-colors" />
              <span className="text-lg text-primary-500">Donate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {isDonateOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsDonateOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-primary-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 text-primary-400 hover:text-primary-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h3 className="font-script text-3xl text-primary-600 mb-2">
              Support this work
            </h3>
            <p className="text-sm text-primary-500 mb-6">
              Every contribution helps create new music and poetry.
            </p>

            {/* Amount options */}
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

            {/* Custom amount */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                  €
                </span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Other"
                  className="w-full pl-8 pr-3 py-3 rounded-xl border-2 border-primary-200 text-primary-600 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <button
                onClick={handleCustomDonate}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Give
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
