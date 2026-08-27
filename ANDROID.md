# Core Académico — Android APK

Este proyecto usa Capacitor para empaquetar Core Académico como una aplicación Android real.

## Generar el APK desde GitHub

1. Sube el contenido de esta carpeta al repositorio.
2. Entra en **Actions**.
3. Ejecuta **Android APK - Core Académico** con **Run workflow**.
4. Cuando termine, abre la ejecución y descarga el artefacto **Core-Academico-Android-debug**.
5. Dentro encontrarás `app-debug.apk`.

También puedes crear una etiqueta, por ejemplo `v4.16.1`, y hacer push. El workflow publicará el APK en **Releases** automáticamente.

## Instalar en Android

Descarga el APK al teléfono, ábrelo y permite la instalación desde esa fuente si Android lo solicita. Es una app real, no un acceso directo del navegador.

## Gemini

En Android, Gemini se configura desde la propia aplicación. La clave se guarda localmente en el dispositivo. No la subas a GitHub ni la pongas en el código fuente.

> Nota: el APK Debug no está firmado para distribución en Google Play. Para Play Store conviene configurar una firma de release con GitHub Secrets.
