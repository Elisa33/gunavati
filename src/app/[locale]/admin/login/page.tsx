"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { loginAdmin } from "../../actions/adminActions"; // Ajustá la ruta

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Llamamos a la función del servidor
    const result = await loginAdmin(password);
    
    if (result.success) {
      // Si todo salió bien, recargamos la página para que el middleware nos deje pasar a /admin
      window.location.href = "/admin";
    } else {
      setError(true);
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-dvh bg-background-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="font-script text-5xl text-secondary-600 mb-2">Welcome</h1>
        <p className="text-primary-400 mb-8">Enter your password to access the panel</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-xl border-2 text-primary-600 focus:outline-none transition-colors text-center ${
              error ? "border-red-400" : "border-primary-200 focus:border-primary-500"
            }`}
          />
          {error && <p className="text-red-500 text-sm">Incorrect password</p>}
          <button
            type="submit"
            disabled={!password || isProcessing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-40"
          >
            {isProcessing ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}