import IpQueryForm from "@/components/IpQueryForm";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Head>
        <title>Consulta de IP</title>
        <meta name="description" content="Consulta información de IPs" />
      </Head>
      <main className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold animate-pulse">Consulta de IP</h1>
        <IpQueryForm />
      </main>
    </div>
  );
}
