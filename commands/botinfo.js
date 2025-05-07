const logMessage = require('../utils/logs')
const config = require('../config.json')
const package = require('../package.json')

module.exports = {
    name: 'botinfo',
    description: {
        en: 'View informations of the bot (Uptime, prefix, ect..)',
        fr: 'Regarde les informations du bot (Uptime, préfixe, ect..)'
    },
    async execute(message, arg, client,lang, langfile) {
        const uptime = client.uptime; 
        const seconds = Math.floor((uptime / 1000) % 60);
        const minutes = Math.floor((uptime / (1000 * 60)) % 60);
        const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
       

        const Upline = `${days} ${langfile.constantes.d}, ${hours} ${langfile.constantes.h}, ${minutes} ${langfile.constantes.m}, ${seconds} ${langfile.constantes.s}`;

        message.reply({
            content: [
                langfile.botinfo.msg1,
                '_ _',
                `${langfile.botinfo.msg2} \`${config.prefix}\``,
                `➡️ Version discord.js: \`v13\` (*discord.js-selfbot-v13*)`,
                `${langfile.botinfo.msg4} \`${Upline}\``,
                `${langfile.botinfo.msg5} ${package.version}`
            ].join('\n')
        })

        await logMessage(message)
    }
};


