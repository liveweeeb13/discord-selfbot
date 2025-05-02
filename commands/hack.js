const { logMessage } = require('../utils/logs')

module.exports = {
    name: 'hack',
    description: 'Simule un hack.',
    async execute(message) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <@user>\``)
        }

        await message.channel.sendTyping();
        message.reply(`\`\`💻 Lancement du hack sur ${target.username}...\`\``);

        setTimeout(() => {
            message.channel.send("\`\`🔍 Récupération de mot de passe : ********\`\`");
        }, 3000);

        setTimeout(() => {
            message.channel.send("\`\`📡 Envoi de frites... 🍟\`\`");
        }, 5000);

        setTimeout(() => {
            message.channel.send("\`\`❌ Hack annulé. Trop mignon pour être piraté.\`\`");
        }, 7000);
        await logMessage(message);
    }
};
