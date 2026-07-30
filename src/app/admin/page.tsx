"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { validateOrder } from "../../app/actions/orderActions";

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleValidate = async () => {
    if (!code) return;
    setStatus("loading");
    const result = await validateOrder(code);
    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setCode("");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  };

  return (
    <main className="min-h-dvh bg-background-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="font-script text-5xl text-secondary-600 mb-2">Admin Panel</h1>
        <p className="text-primary-400 mb-8">Validate payments and send downloads</p>
        
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="GV-XXXX"
            className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 text-primary-600 focus:outline-none focus:border-primary-500 transition-colors text-center font-mono text-xl tracking-widest uppercase"
          />
          <button
            onClick={handleValidate}
            disabled={!code || status === "loading"}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40"
          >
            {status === "loading" ? (
              <>
                <FaSpinner className="animate-spin" /> Validating...
              </>
            ) : (
              "Validate & Send Links"
            )}
          </button>
        </div>

        {status === "success" && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl text-green-700 flex items-center gap-2 justify-center">
            <FaCheckCircle />
            <span>{message}</span>
          </div>
        )}
        {status === "error" && (
          <div className="mt-6 p-4 bg-red-50 rounded-xl text-red-700 flex items-center gap-2 justify-center">
            <FaTimesCircle />
            <span>{message}</span>
          </div>
        )}
      </div>
    </main>
  );
}