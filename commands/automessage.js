const config = require('../config.json')
const logMessage = require('../utils/logs')

let interval = null;
let timeout = null;

module.exports = {
    name: 'automessage',
    description: {
        "fr": 'Envoie un message automatique.',
        "en": "Send an automatic message."
    },
    async execute(message, args, client, lang, lf) {
        if (args.length < 3) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf['automessage'].msg1.replace(/9/g, `"`)}> <${lf['automessage'].msg2}> <${lf['automessage'].msg3}>\``)
        }

        const delay = parseInt(args[args.length - 2], 10);
        const duration = parseInt(args[args.length - 1], 10);

        if (isNaN(delay) || delay <= 0 || delay > 3600) {
            return message.reply(lf['automessage'].msg4);
        }

        if (isNaN(duration) || duration <= 0 || duration > 1000) {
            return message.reply(lf['automessage'].msg5);
        }

        const text = args.slice(0, -2).join(' ').replace(/"/g, "").replace(/'/g, "")

        if (interval) clearInterval(interval);
        if (timeout) clearTimeout(timeout);

        message.channel.send(text) // Envoie direct apres la commande

        interval = setInterval(() => {
            message.channel.sendTyping();
            message.channel.send(text).catch(console.error);
        }, delay * 1000);

        timeout = setTimeout(() => {
            clearInterval(interval);
            interval = null;

          message.channel.send(lf['automessage'].msg6);
            console.log(lf['automessage'].msg6)
        }, duration * 60 * 1000);

        message.reply(
            lf['automessage'].msg7
              .replace(/\[text\]/g, text)
              .replace(/\[delay\]/g, delay)
              .replace(/\[duration\]/g, duration)
          );
          
        console.log(
            lf['automessage'].msg7
            .replace(/\[text\]/g, text)
            .replace(/\[delay\]/g, delay)
            .replace(/\[duration\]/g, duration)
        );

        await logMessage(message)
    }
};
