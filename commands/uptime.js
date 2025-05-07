const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'uptime',
    description: {
        fr: '🆕 Affiche depuis quand le bot était actif',
        en: '🆕 Show how long the bot was up'
    },
    execute(message, arg, client,lang,langfile) {
        const uptime = client.uptime; 
        const seconds = Math.floor((uptime / 1000) % 60);
        const minutes = Math.floor((uptime / (1000 * 60)) % 60);
        const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

        message.reply(`\`\`\`yaml\n${days} ${langfile.constantes.d}, ${hours} ${langfile.constantes.h}, ${minutes} ${langfile.constantes.m}, ${seconds} ${langfile.constantes.s}\`\`\``);
    }
};
