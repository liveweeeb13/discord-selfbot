const logMessage = require('../utils/logs');

module.exports = {
    name: 'breathe',
    aliases: ['respire'],
    description: {
        en: 'Breathe',
        fr: 'Respirer'
    },
    async execute(message, args, client, lang, langfile) {
        const responses = [
            langfile.breathe.msg1,
            langfile.breathe.msg2,
            langfile.breathe.msg3,
            langfile.breathe.msg4,
            langfile.breathe.msg5
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        await message.reply(response);
        await logMessage(message);
    }
}
