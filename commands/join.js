const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'join',
    description: 'Rejoint votre serveur Discord',
    async execute(message) {
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

        message.reply(`⏳ **Validation en attente** - Notre équipe doit vérifier manuellement votre demande d'accès.\n\n🔍 *Merci de patienter le temps qu\'un humain résolve le CAPTCHA (délai moyen : 2-3 jours).*\n\n✅ Vous recevrez une notification dès que votre accès sera approuvé.`);
        await logMessage(message);
    }
};
