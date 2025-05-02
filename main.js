const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const { logMessage } = require('./utils/logs')

// Chargement des commandes
console.log('🔄 Chargement des commandes...');

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

const commands = new Map();
commandFiles.forEach(file => {
    try {
        const command = require(`./commands/${file}`);
        if (command.name && typeof command.execute === 'function') {
            commands.set(command.name, command);
            console.log(`✅ Commande chargee : ${command.name}`);
        } else {
            console.warn(`⚠️ Fichier ignore : ${file}`);
        }
    } catch (err) {
        console.error(`❌ Erreur de chargement ${file} :`, err);
    }
});

console.log(`📦 ${commands.size} commandes chargees.\n`);

// Prêt
client.on('ready', () => {
    console.clear();
    console.log(`✅ ${client.user.username} est prêt !`);
});

// Gestion des messages
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    if (config.just_usable_by_me && message.author.id !== config.my_id) {
        return console.log(`❌ Interaction non autorisee : ${message.author.username} dans le serveur ${message.guild ? message.guild.name : "DM"} | Message : ${message.content}`);
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);
    if (!command) return;

    await message.channel.sendTyping();

    setTimeout(async () => {
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(`❌ Erreur dans la commande "${commandName}" :`, error);
            message.reply('❌ Une erreur est survenue. Ce n\'est pas normal 😕');
        }
    }, config.wt);
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return

    if (message.content.toLowerCase() === `<@${config.my_id}>`) {
        message.reply(`Salut je ne suis pas un robot mais tu devrais essayer de faire \`${config.prefix}\`help`);

        await logMessage(message)
    }
})


client.login(config.token);
