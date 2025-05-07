const config = require('../config.json')
const logMessage = require('../utils/logs')

module.exports = {
    name: 'spam',
    description: {
        fr: '🆕 Spam un message (admins seulement)',
        en: '🆕 Spam a message (only admins)'
    },
    async execute(message, args,c,l,lf) {
        if (!config.admin_id.includes(message.author.id)) {
            message.reply(``)
                .then(nopmsg => {
                    setTimeout(() => {
                        nopmsg.delete()
                    }, 2000);
                })
                        
            return;
        }
        
        const count = parseInt(args[0]);
        if (isNaN(count) || count < 1 || count > 10000) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf['spam'].msg1}> <${lf['spam'].msg2}>`);
        }

        const rawText = args.slice(1).join(' ');

        const cleanedText = rawText.replace(/^["'](.+?)["']$/, '$1');

        if (!cleanedText) {
            return message.reply(lf['spam'].msg3);
        }

        await logMessage(message)

        for (let i = 0; i < count; i++) {
            await message.channel.sendTyping()
            await message.channel.send(cleanedText);
        }
    }
};
