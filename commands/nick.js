const logMessage = require('../utils/logs');

module.exports = {
    name: 'nick',
    description: {
        "fr": 'Change le pseudo du bot dans le serveur actuel',
        "en": "Change the bot's nickname in the current server"
    },
    async execute(message, args,c,lang,lf) {
        if (!message.guild) {
            return message.reply(lf['constantes'].onlyserv)
        }

        const newNickname = args.join(' ') || ' ';

        try {
            await message.guild.members.me.setNickname(newNickname);
            message.reply(lf['nick'].msg1);
            await logMessage(message);
        } catch (error) {
            console.error(error);
            message.reply(lf['nick'].msg2);
        }
    }
};
