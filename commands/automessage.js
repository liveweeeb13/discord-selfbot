let interval = null;
let timeout = null;
const config = require('../config.json')

module.exports = {
    name: 'automessage',
    description: 'Envoie un message automatique.',
    async execute(message, args) {
        if (args.length < 3) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <message> <delay en secondes> <durée en minute>\``)
        }

        const delay = parseInt(args[args.length - 2], 10);
        const duration = parseInt(args[args.length - 1], 10);

        if (isNaN(delay) || delay <= 0 || delay > 3600) {
            return message.reply('❌ Le délai doit être entre 1 et 3600 secondes.');
        }

        if (isNaN(duration) || duration <= 0 || duration > 1000) {
            return message.reply('❌ La durée doit être entre 1 et 1000 minutes.');
        }

        const text = args.slice(0, -2).join(' ');

        if (interval) clearInterval(interval);
        if (timeout) clearTimeout(timeout);

        interval = setInterval(() => {
            message.channel.sendTyping();
            message.channel.send(text).catch(console.error);
        }, delay * 1000);

        timeout = setTimeout(() => {
            clearInterval(interval);
            interval = null;

//          message.channel.send('🛑 Message automatique désactivé.');
            console.log('🛑 AutoMessage désactivé')
        }, duration * 60 * 1000);

//      message.reply(`✅ Envoi de `${text}` toutes les ${delay}s pendant ${duration} minute(s) `);
        console.log('✅ AutoMessage activé')
    }
};
