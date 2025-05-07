const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'status',
    description: {
        fr: 'Change le statut du bot (online, idle, dnd)',
        en: 'Change the bot\'s status (online, idle, dnd)'
    },
    async execute(message,args,client,lang,lf) {
        const status = args[0]?.toLowerCase();

        const validStatuses = ['online', 'idle', 'dnd'];

        if (!validStatuses.includes(status)) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${validStatuses.join(' | ')}>\``)
        }

            message.client.user.setStatus(status);
            message.reply(`${lf['status'].msg1} \`${status}\``);
            logMessage(message);

    }
};