import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip');
    const format = searchParams.get('format') || 'json'; // Por defecto, formato JSON.

    if (!ip) {
        return NextResponse.json({ error: 'IP no proporcionada' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.ipquery.io/${ip}?format=${format}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Error al consultar la API externa' }, { status: 500 });
    }
}
