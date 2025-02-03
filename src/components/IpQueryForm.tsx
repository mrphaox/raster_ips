"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MapView from "@/components/MapView";

interface IpQueryResponse {
  ip: string;
  isp?: { asn: string; org: string; isp: string };
  location?: { country: string; city: string; state: string; latitude: number; longitude: number };
  risk?: { is_vpn: boolean; is_proxy: boolean };
}

const IpQueryForm: React.FC = () => {
  const [ip, setIp] = useState<string>("");
  const [data, setData] = useState<IpQueryResponse | null>(null);
  const [history, setHistory] = useState<IpQueryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setData(null);
    setLoading(true);

    try {
      const response = await axios.get(`/api/ip-query?ip=${ip}`);
      setData(response.data);
      setHistory((prev) => [response.data, ...prev]); // Guardar en historial
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromHistory = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          whileFocus={{ scale: 1.05, borderColor: "#2563EB" }}
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Ingresa una IP"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Consultar"}
        </motion.button>
      </form>

      {/* ERROR */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-3 bg-red-500 text-white text-center rounded-md"
        >
          {error}
        </motion.div>
      )}

      {/* RESULTADOS Y MAPA */}
      {data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md space-y-4"
        >
          <h3 className="font-bold text-lg">Resultados para {data.ip}:</h3>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {JSON.stringify(data, null, 2)}
          </pre>

          {/* Mapa */}
          {data.location && <MapView latitude={data.location.latitude} longitude={data.location.longitude} />}
        </motion.div>
      )}

      {/* HISTORIAL DE BÚSQUEDAS */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
        >
          <h3 className="font-bold text-lg mb-2">Historial de búsquedas:</h3>
          <ul className="space-y-2">
            {history.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-md"
              >
                <span className="text-sm">{item.ip}</span>
                <button
                  onClick={() => handleRemoveFromHistory(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  X
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IpQueryForm;
