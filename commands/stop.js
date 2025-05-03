const config = require('../config.json');
const logMessage = require('../utils/logs');

module.exports = {
    name: 'stop',
    description: 'Arrête le bot (admin seulement)',
    async execute(message) {
        if (!config.admin_id.includes(message.author.id)) {
            return // message.reply('❌ Commande réservée.');
        }

        try {
            //  await message.reply('🛑 Arrêt du bot...');
            await logMessage(message);

            console.log(`\n[ADMIN] Bot arrêté par ${message.author.tag} (${message.author.id})`);
            setTimeout(() => {
                process.exit(1);
            }, 2000);

        } catch (err) {
            console.error('Erreur lors de l\'arrêt du bot :', err);
            message.reply('❌ Échec');
        }
    }
};