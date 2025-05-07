const wr = require('wordwhize');
const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'word',
    description: {
        fr: 'Génère un mot aléatoire.',
        en: 'Generate a random word'
    },
    async execute(message, args, c, l, lf) {
        const supportedLanguages = ['fr', 'en', 'es', 'it', 'ro', 'ar', 'hr', 'cs', 'da', 'nl', 'ka', 'no', 'pl', 'ja', 'jp', 'tr', 'ru'];

        if (args.length !== 2) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf['word'].msg1}> <${lf['word'].msg2}>\``)
        }

        var [lang, countArg] = args;
        const count = parseInt(countArg);

        if (!supportedLanguages.includes(lang.toLowerCase())) {
            return message.reply(`${lf['word'].msg3}: \`${lang}\` ${lf['word'].msg4}: \`${supportedLanguages.join(', ')}\``);
        }

        if (isNaN(count) || count < 1 || count > 30) {
            return message.reply(lf['word'].msg5);
        }

        if (lang == 'jp') { // Pour Japonais
            lang = "ja"
        }


        const words = await wr(count, lang);
        message.reply(`\`${words}\``);

        await logMessage(message);
    }
};
