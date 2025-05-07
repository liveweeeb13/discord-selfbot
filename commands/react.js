const config = require('../config.json')
const logMessage = require('../utils/logs')

module.exports = {
    name: 'react',
    description: {
        "fr": '🆕 Réagit à un message avec un émoji donné',
        "en": "🆕 React to a message with a given emoji"
    },
    async execute(message, args, client,lang, lf) {
        if (args.length < 2) {
            return message.reply(`${lf["constantes"].baduse} \`${config.prefix}${this.name} <${lf["react"].msg1}> <${lf["react"].msg2}>\``);
        }

        const [emoji, messageId] = args;

        try {
            const targetMessage = await message.channel.messages.fetch(messageId);
            if (!targetMessage) {
                return message.reply(lf["react"].msg3);
            }

            await targetMessage.react(emoji);
            await logMessage(message)
             message.reply(`${lf["react"].msg4.replace(/\[emoji\]/g, `"${emoji}"`).replace(/\[messageId\]/g, `"${messageId}"`)}`);
        } catch (error) {
            console.error('❌ Erreur lors de la réaction :', error);
            //// message.reply('❌ Une erreur est survenue lors de la réaction.');
        }
    }
};
