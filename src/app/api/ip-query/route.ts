import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return NextResponse.json({ error: "IP no proporcionada" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.ipquery.io/${ip}?format=json`);
    if (!response.ok) throw new Error("Error en la API externa");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al consultar la API externa:", error);
    return NextResponse.json({ error: "Error al consultar la API externa" }, { status: 500 });
  }
}
