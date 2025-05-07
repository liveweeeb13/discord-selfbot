const logMessage = require('../utils/logs')

module.exports = {
    name: 'credits',
    description: {
        fr: 'Affiche les crédits du bot',
        en: 'Show credits of the bot'
    },
    async execute(message, args, client, lang, lf) {
         
        message.reply(
            `__**${lf['credits'].msg1}**__\n` +
            `     ⤷ **${lf['credits'].msg2}:** [*liveweeeb13*](https://github.com/liveweeeb13)\n` +
            `     ⤷ **${lf['credits'].msg3}:** [*BefAci*](https://github.com/befaci03)\n` +
            `     ⤷ **${lf['credits'].msg4}:** *https://github.com/liveweeeb13/discord-selfbot*`
          );
          
        await logMessage(message)
    }
};
