"use client";
import React, { useState } from "react";
import { FaTimes, FaSpinner, FaHeart, FaPaypal } from "react-icons/fa";
import { createDonationOrder } from "../../actions/orderActions";
import { useTranslations } from "next-intl"; // 👉 Import

const donationAmounts = [5, 10, 20, 50];

export default function Support() {
  const t = useTranslations("Support"); // 👉 Init
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "bank">(
    "paypal",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmitDonation = async () => {
    if (!buyerEmail || selectedAmount === 0) return;
    setIsProcessing(true);

    const result = await createDonationOrder(
      buyerEmail,
      selectedAmount,
      paymentMethod,
    );

    setIsProcessing(false);
    if (result.success) {
      setGeneratedCode(result.code || "");
      setIsSuccess(true);
    } else {
      alert("Error. Try again.");
    }
  };

  return (
    <>
      <section
        id="support"
        className="relative py-24 bg-secondary-100 text-primary-700"
      >
        <div className="mx-auto w-11/12 max-w-4xl text-center">
          <span className="uppercase lg:text-lg text-primary-600 tracking-wider">
            {t("tag")}
          </span>
          <h2 className="font-script text-6xl max-md:[.lang-ru_&]:text-[clamp(44px,calc((100vw-66px)/5.23),60px)] md:text-7xl text-primary-700 font-subtitle p-4">
            {t("title_line1")}{" "}
            <span className="block sm:inline">{t("title_line2")}</span>
          </h2>
          <p className="md:text-lg max-w-xl mx-auto mt-2 text-primary-600">
            {t("paragraph")}
          </p>

          <button
            onClick={() => {
              setIsDonateOpen(true);
              setIsSuccess(false);
              setBuyerEmail("");
            }}
            className="mt-10 flex items-center gap-3 mx-auto px-8 py-3 rounded-full bg-primary-700 text-white text-lg font-semibold hover:bg-primary-600 transition-colors shadow-md"
          >
            <FaHeart /> {t("donate_btn")}
          </button>
        </div>
      </section>

      {/* Modal de Donación */}
      {isDonateOpen && (
        <div
          className="fixed inset-0 z-50 flex overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsDonateOpen(false)}
        >
          <div
            className="relative m-auto bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-primary-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 text-primary-400 hover:text-primary-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {isSuccess ? (
              /* PANTALLA DE ÉXITO */
              <div className="text-center py-2">
                <h3 className="text-2xl font-bold text-primary-600 mb-2">
                  {t("success_title")}
                </h3>
                <p className="text-primary-600 mb-6 text-sm">
                  {t.rich("success_email", {
                    email: buyerEmail,
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>

                <div className="bg-primary-100/50 rounded-xl p-6 text-left mb-6">
                  <p className="text-sm text-primary-700 mb-4">
                    {t.rich("success_amount_donation", {
                      amount: selectedAmount,
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>

                  {paymentMethod === "paypal" ? (
                    <div className="p-4 rounded-lg mb-4 text-center">
                      <p className="font-semibold text-primary-800 text-sm mb-1">
                        {t("success_paypal_title")}
                      </p>
                      <p className="text-sm text-primary-600 mb-3">
                        {t("success_paypal_to")}{" "}
                        <strong className="select-all">
                          belotel13@gmail.com
                        </strong>
                      </p>
                      <a
                        href="https://www.paypal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-[#0070ba] text-white text-sm font-semibold rounded-lg hover:bg-[#005ea6] transition-colors"
                      >
                        {t("success_paypal_btn")}
                      </a>
                    </div>
                  ) : (
                    <div className="p-4 bg-white rounded-lg border border-primary-200 mb-4">
                      <p className="font-semibold text-primary-600 text-sm mb-1">
                        {t("success_bank_title")}
                      </p>
                      <p className="text-sm text-primary-600">
                        {t("success_bank_phone")}
                        <br />
                        {t("success_bank_account")}
                        <br />
                        {t("success_bank_name")}
                      </p>
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-2">
                      {t("success_code")}
                    </p>
                    <div className="inline-block bg-primary-500 text-white font-mono text-xl font-bold tracking-widest px-6 py-2 rounded-lg select-all">
                      {generatedCode}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsDonateOpen(false)}
                  className="px-6 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200 transition-colors"
                >
                  {t("close_btn")}
                </button>
              </div>
            ) : (
              /* FORMULARIO DE DONACIÓN */
              <div>
                <h3 className="text-2xl font-bold text-primary-600 mb-1">
                  {t("modal_title")}
                </h3>
                <p className="text-sm text-primary-500 mb-4">
                  {t("modal_min")}
                </p>

                <div className="bg-secondary-50 border border-secondary-200 text-secondary-800 text-center text-xs p-3 rounded-lg mb-6">
                  <p>{t("context_line1")}</p>
                  <p>{t("context_line2")}</p>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {donationAmounts.map((amount, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedAmount === amount
                          ? "bg-primary-500 text-white border-primary-500"
                          : "border-primary-200 text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-xs text-primary-500 mb-2 uppercase tracking-wider font-semibold">
                    {t("pay_method")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                        paymentMethod === "paypal"
                          ? "bg-primary-500 text-white border-primary-500"
                          : "border-primary-200 text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      <FaPaypal className="text-xl" />
                      PayPal
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all text-sm ${
                        paymentMethod === "bank"
                          ? "bg-primary-500 text-white border-primary-500"
                          : "border-primary-200 text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {t("bank_btn")}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder={t("email_placeholder")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 text-primary-600 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <button
                    onClick={handleSubmitDonation}
                    disabled={!buyerEmail || isProcessing}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40"
                  >
                    {isProcessing ? (
                      <>
                        <FaSpinner className="animate-spin" /> {t("submitting")}
                      </>
                    ) : (
                      <>
                        <FaHeart />{" "}
                        {t("submit_btn_donation", { amount: selectedAmount })}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}