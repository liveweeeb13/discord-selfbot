const { logMessage } = require('../utils/logs');
const config = require('../config.json')

module.exports = {
    name: 'lovemeter',
    description: 'Mesure l\'amour entre deux utilisateurs',
    async execute(message, args) {
        const user1 = message.mentions.users.at(0);
        const user2 = message.mentions.users.at(1);

        if (!user1 || !user2) {
          return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <@user1> <@user2>\``)
        }

        if (user1.id === user2.id) {
            return message.reply("❌ Vous ne pouvez pas comparer la même personne deux fois !");
        }

        const result = Math.ceil(Math.random() * 100);

        message.reply(`💖 \`${user1.username}\` et \`${user2.username}\` sont compatibles à **${result}%** !`);

        await logMessage(message);
    }
};
