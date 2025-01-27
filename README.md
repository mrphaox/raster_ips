
#Consulta de IP 🌐

Este es un proyecto [Next.js](https://nextjs.org) arrancado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Empezando

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

Puedes empezar a editar la página modificando `app/page.tsx`. La página se auto-actualiza a medida que editas el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia de fuentes para Vercel.

## Más información

Este proyecto es una aplicación web para consultar información detallada sobre direcciones IP. Utiliza Next.js, Framer Motion para animaciones, y un diseño atractivo hecho con Tailwind CSS. Proporciona detalles como la ubicación, el ISP, y posibles riesgos asociados a la IP.

Características 🚀

Consulta de IPs: Busca información sobre cualquier dirección IP ingresada.
Diseño moderno e interactivo: Animaciones fluidas con Framer Motion.
Historial de búsquedas: Muestra un registro de las IPs consultadas recientemente.
Interacción amigable: Botones para "Buscar otra IP" y "Eliminar búsqueda" con efectos visuales atractivos.
Soporte para tema oscuro: Diseño que se adapta a preferencias de tema claro/oscuro.
Capturas de Pantalla 📸
Pantalla Principal
[Coloca aquí una captura de la pantalla inicial]

Resultados de Búsqueda
[Coloca aquí una captura de la sección de resultados]

Historial de Búsquedas
[Coloca aquí una captura de la lista de historial]

Tecnologías Utilizadas 🛠️
Next.js: Framework de React para aplicaciones web modernas.
Framer Motion: Librería para crear animaciones fluidas y atractivas.
Tailwind CSS: Framework de diseño para estilos rápidos y personalizables.
Axios: Para realizar solicitudes HTTP.
TypeScript: Para tipado estático y mayor confiabilidad en el código.
Instalación 🧑‍💻
Clona este repositorio:

# or
git clone https://github.com/tu-usuario/consulta-ip.git
cd consulta-ip
Instala las dependencias:

## npm install
Ejecuta el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abre el navegador en http://localhost:3000.

Estructura del Proyecto 📂
php
Copiar
Editar
📦 consulta-ip
├── 📁 components
│   └── IpQueryForm.tsx  # Componente principal del formulario
├── 📁 pages
│   ├── index.tsx        # Página principal
│   ├── _app.tsx         # Configuración global
├── 📁 public            # Recursos estáticos
├── 📁 styles
│   └── globals.css      # Estilos globales
├── README.md            # Este archivo
└── package.json         # Dependencias y configuración del proyecto
Configuración Adicional ⚙️
Si necesitas personalizar la API de consulta de IP, edita el endpoint en IpQueryForm.tsx:

ts
Copiar
Editar
const response = await axios.get(`/api/ip-query?ip=${ip}`);
Puedes reemplazar /api/ip-query con cualquier endpoint que acepte una dirección IP como parámetro.

Contribuciones 🤝
¡Las contribuciones son bienvenidas! Si tienes ideas o mejoras para el proyecto:

Haz un fork del repositorio.
Crea una rama para tus cambios:
bash
Copiar
Editar
git checkout -b feature/nueva-funcionalidad
Haz commit de tus cambios:
bash
Copiar
Editar
git commit -m "Agrega nueva funcionalidad"
Sube los cambios:
bash
Copiar
Editar
git push origin feature/nueva-funcionalidad
Crea un pull request.
Licencia 📜
Este proyecto está bajo la licencia MIT.

Autor 👨‍💻
Desarrollado con ❤️ por Tu Nombre o Usuario de GitHub.

## Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es utilizar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Echa un vistazo a nuestra [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

