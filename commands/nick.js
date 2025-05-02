const { logMessage } = require('../utils/logs');

module.exports = {
    name: 'nick',
    description: 'Change le pseudo du bot dans le serveur actuel',
    async execute(message, args) {
        if (!message.guild) {
            return message.reply('❌ Uniquement en serveur')
        }

        const newNickname = args.join(' ') || ' ';

        try {
            await message.guild.members.me.setNickname(newNickname);
            message.reply(`✅ Pseudo changé`);
            await logMessage(message);
        } catch (error) {
            console.error(error);
            message.reply("❌ Impossible de changer le pseudo.");
        }
    }
};
