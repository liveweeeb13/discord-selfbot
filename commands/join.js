const { logMessage } = require('../utils/logs')

module.exports = {
    name: 'join',
    description: 'Rejoindre votre serveur Discord',
    async execute(message, config) {
        function isValidInvite(url) {
            return url.includes('discord.gg') || url.includes('discord.com/invite');
        }

        if (message.guild) {
            return message.reply('❌ Uniquement en mp') 
        }

        const args = message.content.split(' ').slice(1);

        if (args.length === 0 || !isValidInvite(args[0])) {
           return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <lien_infini>\``) 
        }

        message.reply(`✅ Merci de patienter pendant que mon humain résout le CAPTCHA. L'attente est estimée \`environ une semaine\`.`);
        await logMessage(message);
    }
};
