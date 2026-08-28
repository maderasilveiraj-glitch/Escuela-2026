@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo     CORE ACADEMICO - BUILD WINDOWS
echo ========================================
echo.

echo [1/2] Instalando dependencias...
npm install
if errorlevel 1 (
  echo.
  echo ERROR: No se pudieron instalar las dependencias.
  pause
  exit /b 1
)

echo.
echo [2/2] Generando instalador y version portable...
npm run dist
if errorlevel 1 (
  echo.
  echo ERROR: No se pudo generar el EXE.
  pause
  exit /b 1
)

echo.
echo ========================================
echo   LISTO. Revisa la carpeta dist.
echo ========================================
explorer dist
pause
