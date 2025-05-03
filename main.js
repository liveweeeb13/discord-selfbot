// PACKAGES &
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const fs = require('fs');
const path = require('path');
// FUNCTION &
const sensibles = require('./sensibles.json')
const { logMessage } = require('./utils/logs')
const config = require('./config.json');


// Chargement des commandes
console.log('🔄 Chargement des commandes...');

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
const commands = new Map();
commandFiles.forEach(file => {
    try {
        const command = require(`./commands/${file}`);
        
        if (command.name && typeof command.execute === 'function') {
            commands.set(command.name, command);
            console.log(`✅ Commande chargée : ${command.name}`);
            
            if (Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    if (!commands.has(alias)) {
                        commands.set(alias, command);
                        console.log(`↪️ Alias ajouté : ${alias} -> ${command.name}`);
                    } else {
                        // console.warn(`⚠️ Alias ignoré : ${alias}`);
                    }
                });
            } else if (typeof command.aliases === 'string') {
                const alias = command.aliases;
                if (!commands.has(alias)) {
                    commands.set(alias, command);
                    console.log(`↪️ Alias ajouté : ${alias} -> ${command.name}`);
                } else {
                    // console.warn(`⚠️ Alias ignoré : ${alias}`);
                }
            }
        } else {
            console.warn(`⚠️ Fichier ignoré : ${file}`);
        }
    } catch (err) {
        console.error(`❌ Erreur de chargement ${file} :`, err);
    }
});

console.log(`📦 ${commands.size} commandes chargees.\n`);
console.warn('Connection a Discord...')

// Prêt
client.on('ready', () => {
    console.clear();
    console.log(`✅ ${client.user.username} est prêt !`);
});


// Gestion des commandes
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = commands.get(commandName);

    const isAuthorized = config.authorized_id.includes(message.author.id) || config.admin_id.includes(message.author.id);
    if (config.just_usable_by_me && !isAuthorized) {
        console.log(`❌ Interaction non autorisée : ${message.author.username} dans ${message.guild ? message.guild.name : "DM"} | Message : ${message.content}`);
        return;
    }

    if (!command || typeof command.execute !== 'function') return;

    try {
        await message.channel.sendTyping();
        const delay = isNaN(parseInt(config.wt)) ? 0 : parseInt(config.wt);

        setTimeout(async () => {
            try {
                await command.execute(message, args);
            } catch (err) {
                console.error(`❌ Erreur lors de l'exécution de "${commandName}" :`, err);
                message.reply('❌ Une erreur est survenue. Ce n\'est pas normal 😕');
            }
        }, delay);
    } catch (error) {
        console.error(`❌ Erreur générale dans le gestionnaire de message :`, error);
    }
});

// Gestion des messages
client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    const isAuthorized = config.authorized_id.includes(message.author.id) || config.admin_id.includes(message.author.id);
    if (config.just_usable_by_me && !isAuthorized) {
        //     console.log(`❌ Interaction non autorisée : ${message.author.username} dans ${message.guild ? message.guild.name : "DM"} | Message : ${message.content}`);
        return;
    }

    if (message.content.toLowerCase() === `<@${client.user.id}>`) {
        message.reply(`Salut je ne suis pas un robot mais tu devrais essayer de faire \`${config.prefix}help\``);

        await logMessage(message)
    }
})

// HANDLERS ANTI-CRASH
process.on("unhandledRejection", (reason, promise) => {
    console.log(reason, "\n", promise);
});

process.on("uncaughtException", (err, origin) => {
    console.log(err, "\n", origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, "\n", origin);
});

process.on("warning", (warn) => {
    console.log(warn);
});

// Connection a l'API discord
client.login(sensibles.token);
