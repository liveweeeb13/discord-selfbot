const { logMessage } = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: '8ball',
    description: "Pose une question au bot",
    async execute(message, args) {
        const question = args.join(' ').trim();

        if (!question) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <question>\``)
        }

        const reponses = [
            "Essaye plus tard",
            "Essaye encore",
            "Pas d'avis",
            "C'est ton destin",
            "Le sort en est jeté",
            "Une chance sur deux",
            "Repose ta question",
            "D'après moi oui",
            "C'est certain",
            "Oui absolument",
            "Tu peux compter dessus",
            "Sans aucun doute",
            "Très probable",
            "Oui",
            "C'est bien parti",
            "C'est non",
            "Peu probable",
            "Faut pas rêver",
            "N'y compte pas",
            "Impossible"
        ]

        const reponse = reponses[Math.floor(Math.random() * reponses.length)];
        message.reply(`${reponse}`);

        await logMessage(message);
    }
};
