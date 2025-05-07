const logMessage = require('../utils/logs');
const config = require('../config.json')

module.exports = {
    name: 'lovemeter',
    aliases: ["love"],
    description: {
        fr: 'Mesure l\'amour entre deux personnes.',
        en: 'Measure the love between two people.'
    },
    async execute(message, args, c, lang, lf) {
        if (args.length < 2) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} @user1 @user2\``);
        }

        const user1 = message.mentions.users.get(args[0].replace(/[<@!>]/g, '')) ||
                      await message.client.users.fetch(args[0]).catch(() => null);

        const user2 = message.mentions.users.get(args[1].replace(/[<@!>]/g, '')) ||
                      await message.client.users.fetch(args[1]).catch(() => null);

                      
        if (!user1 || !user2) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} @user1 @user2\``);
        }

        if (user1.id === user2.id) {
            return message.reply(lf['love'].msg2);
        }


        const result = Math.ceil(Math.random() * 100);

        message.reply(`💖 \`${user1.username}\` ${lf['constantes'].and} \`${user2.username}\` ${lf['love'].msg3} **${result}%** !`);

        await logMessage(message);
    }
};
