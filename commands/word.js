const wr = require('wordwhize');
const { logMessage } = require('../utils/logs')

module.exports = {
    name: 'word',
    description: 'Génère un mot aléatoire.',
    async execute(message, args) {
        const supportedLanguages = ['fr','en','es','it','ro','ar','hr','cs','da','nl','ka','no','pl','ja', 'jp', 'tr','ru'];

        if (args.length !== 2) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <lang> <longueur>\``)
        }

        var [lang, countArg] = args;
        const count = parseInt(countArg);

        if (!supportedLanguages.includes(lang.toLowerCase())) {
            return message.reply("❌ Langue invalide. Choisis parmi : `" + supportedLanguages.join(', ') + "`");
        }

        if (isNaN(count) || count < 1 || count > 30) {
            return message.reply("❌ Le nombre doit être entre 1 et 30.");
        }

        if (lang == 'jp') { 
            var lang = "ja" 
        }

        try {
            const words = await wr(count, lang);
            message.reply(`\`${words}\``);
        } catch (err) {
            console.error(err);
            message.reply("❌ Une erreur est survenue");
        }
        await logMessage(message);
    }
};
