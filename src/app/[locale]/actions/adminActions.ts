"use server";
import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  // Comparamos la contraseña de forma segura en el servidor
  if (password === process.env.ADMIN_PASSWORD) {
    // 👉 AGREGAMOS EL 'await' AQUÍ
    const cookieStore = await cookies();
    
    // Si es correcta, creamos la cookie de 30 días
    cookieStore.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 días en segundos
      path: "/",
    });
    return { success: true };
  }
  return { success: false };
}