"use client"; // ✅ Obligamos a que Next.js renderice este componente en el cliente

import Footer from "@/components/Footer";
import IpQueryForm from "@/components/IpQueryForm";
import Head from "next/head";
import { motion } from "framer-motion";
import BackgroundAnimation from "@/components/BackgroundAnimation"; // Fondo dinámico
export const dynamic = "force-dynamic"; // Evita prerenderización en SSR


export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-900 text-white p-8"
    >
      <Head>
        <title>Consulta de IP</title>
        <meta name="description" content="Consulta información de IPs con una experiencia innovadora" />
      </Head>

      {/* Fondo dinámico con partículas */}
      <BackgroundAnimation />

      {/* Contenido Principal */}
      <main className="relative z-10 flex flex-col items-center space-y-8">
        {/* Título Animado */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 drop-shadow-lg"
        >
          🚀 Consulta la IP!
        </motion.h1>

        {/* Formulario Animado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <IpQueryForm />
        </motion.div>

        {/* Pie de página */}
        <Footer />
      </main>
    </motion.div>
  );
}
