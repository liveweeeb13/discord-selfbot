const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const logMessage = require('../utils/logs');

module.exports = {
    name: 'help',
    description: 'Affiche toutes les commandes disponibles.',
    async execute(message) {
        const commandsPath = __dirname;
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'help.js');

        let helpText = '🤖 Voici la liste des commandes disponibles :\n';

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            helpText += `- \`${config.prefix}${command.name || "N/A"}\` : ${command.description || "N/A"}\n`;
        }

        await message.reply(helpText.trim());
        await logMessage(message);
    }
};
