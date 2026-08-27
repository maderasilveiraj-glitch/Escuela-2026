# Core Académico v4.19 — APK desde GitHub

Este proyecto está preparado para que GitHub Actions genere un APK Android y, al finalizar, cree un ZIP llamado `Core-Academico-Android.zip` que contiene `Core-Academico.apk`.

## Cómo usarlo
1. Sube **todo el contenido** de este proyecto a la raíz de tu repositorio GitHub.
2. En GitHub abre **Actions**.
3. Selecciona **📱 Build Android APK - Core Académico**.
4. Pulsa **Run workflow**.
5. Espera a que termine en verde.
6. Abre la ejecución y baja a **Artifacts**.
7. Descarga `Core-Academico-Android-ZIP`.
8. En tu celular descomprime el ZIP y encontrarás `Core-Academico.apk`.

## Publicar automáticamente una Release
Desde tu PC puedes crear una etiqueta, por ejemplo `v4.19.0`, y subirla. El workflow compilará el APK y adjuntará `Core-Academico-Android.zip` a la Release.

## Gemini
No incluyas una API key de Gemini en el repositorio. La aplicación está preparada para usar el proxy seguro de Gemini definido en `proxy/`. Configura la clave como secreto del servidor/proxy, nunca dentro del APK.

> El APK generado por este workflow es un APK **debug/no firmado para distribución en Play Store**. Sirve para instalar y probar en Android. Para Google Play conviene crear posteriormente un build `release` firmado con un keystore protegido mediante GitHub Secrets.
