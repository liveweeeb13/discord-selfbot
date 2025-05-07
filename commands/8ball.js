const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: '8ball',
    description: {
        "fr": "Pose une question au bot",
        "en": "Ask the bot a question"
    },
    async execute(message, args, client,l ,lf) {
        const question = args.join(' ').trim();

        if (!question) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf["constantes"].question}>\``)
        }

        const reponses = [
            lf["8ball"].msg1,
            lf["8ball"].msg2,
            lf["8ball"].msg3,
            lf["8ball"].msg4,
            lf["8ball"].msg5,
            lf["8ball"].msg6,
            lf["8ball"].msg7,
            lf["8ball"].msg8,
            lf["8ball"].msg9,
            lf["8ball"].msg10,
            lf["8ball"].msg11,
            lf["8ball"].msg12,
            lf["8ball"].msg13,
            lf["8ball"].msg14,
            lf["8ball"].msg15,
            lf["8ball"].msg16,
            lf["8ball"].msg17,
            lf["8ball"].msg18,
            lf["8ball"].msg19,
            lf["8ball"].msg20
        ];
        

        const reponse = reponses[Math.floor(Math.random() * reponses.length)];
        message.reply(`${reponse}`);

        await logMessage(message);
    }
};
