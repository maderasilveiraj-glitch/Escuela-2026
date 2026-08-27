# Core Académico v4.16

Suite académica para Windows con calculadoras, notas rápidas, herramientas de estudio y asistencia con Gemini.

## Funciones principales

- Calculadoras de álgebra, cálculo, trigonometría y álgebra lineal.
- Resolución desde imágenes y seguimiento del método mostrado.
- Notas rápidas tipo post-it con colores.
- Temas visuales.
- Materias, tareas, exámenes y calendario.
- Pomodoro y seguimiento de sesiones.
- Graficador de funciones.
- Generador de ejercicios y prácticas.
- Biblioteca y respaldos locales.
- Gemini multimodal para texto e imágenes.
- Monitor local de uso de Gemini y detección de errores de cuota.

## Ejecutar localmente

Requiere Node.js 20+.

```bash
npm install
npm start
```

## Generar Windows

```bash
npm run dist
```

Los instaladores aparecen en `dist/`.

## GitHub Actions

El workflow `.github/workflows/build-windows.yml` compila automáticamente para Windows cuando:

- ejecutas el workflow manualmente desde **Actions**, o
- publicas un tag con formato `v4.16.0`, `v4.16.1`, etc.

Cuando se publica un tag `v*.*.*`, GitHub crea un **Release** y adjunta el instalador NSIS y la versión portable `.exe`.

### Para crear una versión nueva

```bash
git add .
git commit -m "Nueva versión"
git tag v4.16.1
git push origin main --tags
```

## Gemini

La API key no está incluida en el repositorio. Cada usuario debe configurar su propia clave desde la aplicación. No subas una API key a GitHub.

## Licencia

MIT
