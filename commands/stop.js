const config = require('../config.json');
const logMessage = require('../utils/logs');

module.exports = {
    name: 'stop',
    description: {
        fr: 'Arrête le bot (admins seulement)',
        en: 'Stop the bot (only admins)'
    },
    async execute(message) {
        if (!config.admin_id.includes(message.author.id)) {
            return// message.reply('❌ Commande réservée.');
        }

        try {
            await logMessage(message);

            console.log(`\n ${lf["status"].msg1.replace(/\[[message.author.tag]\]/g, message.author.tag).replace(/\[[message.author.id]\]/g, message.author.id)}`);
      
            setTimeout(() => {
                process.exit(1);
            }, 2000);

        } catch (err) {
           return message.reply('❌');
        }
    }
};