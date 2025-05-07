const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'join',
    description: {
        fr: 'Rejoint un serveur Discord',
        en: 'Join a Discord server'
    },
    async execute(message, args, client,lang, lf) {
        function isValidInvite(url) {
            return url.includes('discord.gg') || url.includes('discord.com/invite');
        }

        if (message.guild) {
            return message.reply(lf['constantes'].onlymp) 
        }

        if (args.length === 0 || !isValidInvite(args[0])) {
           return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf['join'].msg1}>\``) 
        }

        message.reply(lf['join'].msg2);
        await logMessage(message);
    }
};
