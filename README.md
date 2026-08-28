# Proxy seguro de Gemini

Este Worker evita guardar la API key de Gemini dentro del repositorio, Electron o APK.

## Cloudflare Workers
1. Instala Wrangler: `npm install -g wrangler`
2. Entra: `wrangler login`
3. Edita `ALLOWED_ORIGINS` en `worker.js` con tu dominio de GitHub Pages.
4. Publica: `wrangler deploy`
5. Guarda la clave como secreto, nunca en Git:
   `npx wrangler secret put GEMINI_API_KEY`

Luego copia la URL del Worker en Core Académico → Configuración → Gemini → Proxy seguro.

> El endpoint sigue siendo público. Para una aplicación distribuida masivamente, añade autenticación/rate limiting en el Worker (por ejemplo Cloudflare Turnstile, Durable Objects o un sistema de cuentas). Nunca pongas una segunda clave secreta dentro del APK.
