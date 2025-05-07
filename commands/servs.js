const logMessage = require('../utils/logs');
const config = require('../config.json');

module.exports = {
    name: 'serveur',
    aliases: ['serveurs', 'serv', 'servs', 'server', 'servers', 'srv'],
    description: {
        fr: '🆕 Affiche le nombre de serveur du bot',
        en: '🆕 Shows servers that the bot is in'
    },
    async execute(message,args,c,l,lf) {
    if (!config.admin_id.includes(message.author.id)) {
        message.reply('❌ Commande réservée.')
            .then(nopmsg => {
                setTimeout(() => {
                    nopmsg.delete()
                }, 2000);
            });
        return;
    }

    const serverCount = message.client.guilds.cache.size; // Nombre total de serveurs
    const guilds = message.client.guilds.cache;

    const ownedGuilds = guilds.filter(guild => guild.ownerId === message.client.user.id);
    const ownedGuildNames = ownedGuilds.map(guild => guild.name).join(' | ') || 'Aucune';

    message.reply(`${lf['stats'].msg1.replace(/\[serverCount\]/g, `**${serverCount}**`)}`/* + `${lf['stats'].msg2.replace(/\[[ownedGuilds.size]\]/g, `**${ownedGuilds.size}**`).replace(/\[[ownedGuildNames]\]/g, `\`${ownedGuildNames}\``)}`*/);
    await logMessage(message);
},
};
