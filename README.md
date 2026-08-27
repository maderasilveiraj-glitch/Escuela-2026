# Core Académico v4.16 — Gemini + monitor de uso

Esta versión conserva las funciones académicas, notas rápidas, temas, calculadoras, herramientas y versión de escritorio de Core Académico.

## IA
- Integración únicamente con Gemini API.
- Texto e imágenes para ejercicios.
- Puede seguir el método mostrado en imágenes de referencia.
- Respuestas del motor local + Gemini.
- Sin integración con OpenAI/ChatGPT.

## Monitor de uso de Gemini
En **IA con Gemini** aparece **📊 Uso de Gemini** con:
- Solicitudes realizadas durante el mes.
- Tokens registrados cuando la API los devuelve.
- Mes actual.
- Avisos locales al alcanzar 50 y 80 solicitudes.
- Detección de respuestas de cuota/límite (por ejemplo HTTP 429).
- Botón para actualizar.
- Botón para restablecer el contador local.

### Importante sobre la cuota
La Gemini API no entrega a esta aplicación un saldo exacto universal de "créditos restantes". Por eso el monitor es un **contador local**, no un medidor oficial de cuota. Cuando Google devuelva un error de cuota o límite, Core lo detectará y mostrará una alerta. Para conocer el saldo/límites oficiales hay que revisar la consola de Google AI Studio/Google Cloud asociada a la clave.

## Windows
Ejecuta `BUILD-WINDOWS.bat` en Windows para instalar dependencias y generar el instalador `.exe` y la versión portable.
