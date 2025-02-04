"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });


interface IpQueryResponse {
  ip: string;
  isp?: { asn: string; org: string; isp: string };
  location?: {
    country: string;
    country_code: string;
    flag: string;
    city: string;
    state: string;
    timezone: string;
    latitude: number;
    longitude: number;
  };
  risk?: { is_vpn: boolean; is_proxy: boolean };
}

const IpQueryForm: React.FC = () => {
  const [ip, setIp] = useState<string>("");
  const [data, setData] = useState<IpQueryResponse | null>(null);
  const [history, setHistory] = useState<IpQueryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem("ipHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, []);
  
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setData(null);
    setLoading(true);

    try {
      const response = await axios.get(`/api/ip-query?ip=${ip}`);
      setData(response.data);
      const newHistory = [response.data, ...history];

      localStorage.setItem("ipHistory", JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromHistory = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("ipHistory", JSON.stringify(newHistory));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          whileFocus={{ scale: 1.05, borderColor: "#2563EB" }}
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Ingresa una IPv4 o IPv6"
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

      {data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md space-y-4"
        >
          <h3 className="font-bold text-lg text-blue-600 dark:text-blue-300">
            Resultados para {data.ip}
          </h3>

          {/* Proveedor de Internet */}
          {data.isp && (
            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md">
              <h4 className="font-bold">Proveedor de Internet (ISP):</h4>
              <p className="text-sm">{data.isp.isp}</p>
              <p className="text-sm text-gray-500">{data.isp.org} (ASN: {data.isp.asn})</p>
            </div>
          )}

          {/* Ubicación */}
          {data.location && (
            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md">
              <h4 className="font-bold">Ubicación:</h4>
              <p className="text-sm">
                <span className="font-bold">Ciudad:</span> {data.location.city}
              </p>
              <p className="text-sm">
                <span className="font-bold">Estado:</span> {data.location.state}
              </p>
              <p className="text-sm">
                <span className="font-bold">País:</span> {data.location.country} 
                <span className="ml-2 text-lg">{data.location.flag}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold">Código de País:</span> {data.location.country_code}
              </p>
              <p className="text-sm">
                <span className="font-bold">Zona Horaria:</span> {data.location.timezone}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Coordenadas:</span> {data.location.latitude}, {data.location.longitude}
              </p>
            </div>
          )}

          {/* Riesgo */}
          {data.risk && (
            <div className="p-3 bg-red-100 dark:bg-red-800 rounded-md">
              <h4 className="font-bold text-red-600">Riesgo:</h4>
              <p className="text-sm">{data.risk.is_vpn ? "VPN detectada" : "No es VPN"}</p>
              <p className="text-sm">{data.risk.is_proxy ? "Proxy detectado" : "No es Proxy"}</p>
            </div>
          )}

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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-md"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{item.ip}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {item.location?.city}, {item.location?.country} {item.location?.flag}
                  </span>
                </div>
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
