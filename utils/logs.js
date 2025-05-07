const fs = require('fs');
const path = require('path');

function logMessage(message) {
    const now = new Date();
    const parisTime = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris', // Votre Fuseau Horaire : (./timezones.json)
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Si vous voulez le format 12 heures
    }).formatToParts(now);

    const getPart = (type) => parisTime.find(p => p.type === type)?.value;

    const year = getPart('year');
    const month = getPart('month');
    const day = getPart('day');
    const hours = getPart('hour');
    const minutes = getPart('minute');
    const seconds = getPart('second');

    const dateStr = `${year}-${month}-${day}`;
    const timeStr = `[${hours}:${minutes}:${seconds}] -`;

    const logsDir = path.join(__dirname, '../logs');
    const logFilePath = path.join(logsDir, `${dateStr}.log`);

    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '', 'utf8');
    }

    const logLine = `${timeStr} ${message.author.tag} (${message.author.id}) a exécuté la commande "${message.content}" sur le serveur ${message.guild ? message.guild.name : "DM"} ${message.guild ? message.guild.id : "Aucune"}\n`;
    fs.appendFileSync(logFilePath, logLine, 'utf8');
    console.log(logLine);
}

module.exports = logMessage ;
