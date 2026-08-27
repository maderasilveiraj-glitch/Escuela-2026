# Core Académico — GitHub Pages + PWA

Proyecto preparado para publicar directamente en GitHub Pages.

## Estructura

- `index.html` — aplicación principal.
- `manifest.webmanifest` — configuración instalable de la PWA.
- `sw.js` — Service Worker para caché/offline.
- `icons/` — iconos de instalación.
- `.github/workflows/deploy.yml` — despliegue automático a GitHub Pages.

## Publicación recomendada

1. Crea un repositorio en GitHub.
2. Sube TODOS los archivos de esta carpeta conservando la estructura.
3. Usa la rama `main`.
4. En GitHub: Settings → Pages.
5. En "Build and deployment", selecciona "GitHub Actions".
6. Haz push a `main` o ejecuta el workflow manualmente.
7. Abre la URL que GitHub Pages muestre.

## PWA

El Service Worker necesita HTTPS o localhost. GitHub Pages sirve por HTTPS, por lo que la PWA puede instalarse y funcionar offline después de la primera carga.

## Importante

Los datos académicos de la app se guardan en `localStorage` del navegador/dispositivo. Publicar la app en GitHub NO sube esos datos al repositorio.
