const logMessage = require('../utils/logs')

module.exports = {
    name: 'credits',
    description: '🆕 Affiche les credits du bot',
    async execute(message) {
        message.reply('__**Voici mes credits:**__ \n     ⤷ **Développeur:** [*liveweeeb13*](https://github.com/liveweeeb13)\n     ⤷ **Aide au développeur:** [*BefAci*](https://github.com/befaci03)\n     ⤷ **Code source:** *https://github.com/liveweeeb13/discord-selfbot*')

        await logMessage(message)
    }
};
