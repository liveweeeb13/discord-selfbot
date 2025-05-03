const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'status',
    description: 'Change le statut du bot (online, idle, dnd)',
    async execute(message) {
        const args = message.content.split(' ').slice(1);
        const status = args[0]?.toLowerCase();

        const validStatuses = ['online', 'idle', 'dnd'];

        if (!validStatuses.includes(status)) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <${validStatuses.join(' | ')}>\``)
        }

        try {
            message.client.user.setStatus(status);
            message.reply(`✅ Statut changé en \`${status}\``);
            logMessage(message, message);
        } catch (err) {
            console.error('Erreur lors du changement de statut :', err);
            message.reply('❌ Une erreur est survenue lors du changement de statut.');
        }
    }
};