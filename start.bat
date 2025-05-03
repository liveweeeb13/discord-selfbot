@echo off
SETLOCAL

IF NOT EXIST "node_modules" (
        echo - Installation des dependances...
        npm install
    )
)

echo - Demarrage du projet...
npm run start

ENDLOCAL
pause
