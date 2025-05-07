const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const logMessage = require('../utils/logs');

module.exports = {
    name: 'help',
    description: {
        fr: 'Affiche toutes les commandes disponibles.',
        en: 'View all bot commands',
    },
    async execute(message, args, client, lang) {
        const commandsPath = __dirname;
        const commandFiles = fs.readdirSync(commandsPath)
            .filter(file => file.endsWith('.js') && file !== 'help.js' && file !== 'stop.js');

        // Texte de bienvenue multilingue
        let helpText = lang === 'fr'
            ? '🤖 Voici la liste des commandes disponibles :\n'
            : '🤖 Here is the list of available commands:\n';

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            const commandName = command.name || "N/A";

            const commandDescription = (command.description && typeof command.description === 'object')
                ? command.description[lang] || command.description['en'] || "N/A"  // Fallback vers anglais si langue non trouvée
                : command.description || "N/A"; // Si description est une chaîne simple

            helpText += `- \`${config.prefix}${commandName}\` : ${commandDescription}\n`;
        }

        await message.reply(helpText.trim());
        await logMessage(message);
    }
};
