@echo off
SETLOCAL

IF NOT EXIST "node_modules" (
    IF NOT EXIST "package-lock.json" (
        echo - Installation des dependances...
        npm install
    )
)

echo - Demarrage du projet...
npm run start

ENDLOCAL
pause
