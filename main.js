// PACKAGES &
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const fs = require('fs');
const path = require('path');
// FUNCTION &
const sensibles = require('./sensibles.json');
const logMessage = require('./utils/logs');
const config = require('./config.json');

const langDbPath = path.join(__dirname, 'db', 'lang.json');
function getLangDb() {
    if (!fs.existsSync(langDbPath)) {
        fs.writeFileSync(langDbPath, JSON.stringify({ fr: [], en: [] }, null, 0), 'utf-8');
    }
    return JSON.parse(fs.readFileSync(langDbPath, 'utf-8'));
}
function saveLangDb(db) {
    fs.writeFileSync(langDbPath, JSON.stringify(db, null, 0), 'utf-8');
}
function getUserLang(userId, db) {
    for (const lang of Object.keys(db)) {
        if (db[lang].includes(userId)) return lang;
    }
    return null;
}
function setUserLang(userId, lang, db) {
    for (const l of Object.keys(db)) {
        db[l] = db[l].filter(id => id !== userId);
    }
    if (!db[lang]) db[lang] = [];
    db[lang].push(userId);
}

// Loading commands
console.log('🔄 Loading commands...');
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
                        console.log(`↪️ Alias added : ${alias} -> ${command.name}`);
                    }
                });
            } else if (typeof command.aliases === 'string') {
                const alias = command.aliases;
                if (!commands.has(alias)) {
                    commands.set(alias, command);
                    console.log(`↪️ Alias added : ${alias} -> ${command.name}`);
                }
            }
        } else {
            console.warn(`⚠️ File ignored : ${file}`);
        }
    } catch (err) {
        console.error(`❌ Loading error ${file} :`, err);
    }
});
console.log(`📦 ${commands.size} commands loaded.\n`);
console.warn('Connecting to Discord...');

// Prêt
client.on('ready', () => {
    console.clear();
    console.log(`✅ ${client.user.username} is ready !`);
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
        return;
    }

    if (!command || typeof command.execute !== 'function') return;

    try {
        await message.channel.sendTyping();
        const delay = isNaN(parseInt(config.wt)) ? 0 : parseInt(config.wt);

        setTimeout(async () => {
            try {
                let db = getLangDb();
                let userLang = getUserLang(message.author.id, db);
                if (!userLang) {
                    setUserLang(message.author.id, config.defaultLang || "fr", db);
                    saveLangDb(db);
                    userLang = config.defaultLang || "fr";
                }
                let langPath = path.join(__dirname, 'locales', `${userLang}.json`);
                let langfile = JSON.parse(fs.readFileSync(langPath, 'utf8'));

                await command.execute(message, args, client, userLang, langfile);
            } catch (err) {
                let db = getLangDb();
                let userLang = getUserLang(message.author.id, db);
                if (!userLang) {
                    setUserLang(message.author.id, config.defaultLang || "en", db);
                    saveLangDb(db);
                    userLang = config.defaultLang || "en";
                }
                let langPath = path.join(__dirname, 'locales', `${userLang}.json`);
                let languageFile = JSON.parse(fs.readFileSync(langPath, 'utf8'));
                console.error(`❌ Error while executing "${commandName}" :`, err);
                message.reply(`${languageFile["main"].msg1}`);

            }
        }, delay);
    } catch (error) {
        console.error(`❌ General error in the commands handler :`, error);
    }
});

// Message Handler
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const isAuthorized = config.authorized_id.includes(message.author.id) || config.admin_id.includes(message.author.id);
    if (config.just_usable_by_me && !isAuthorized) {
        return;
    }

    if (message.content.toLowerCase() === `<@${client.user.id}>`) {
        const db = getLangDb();
        let userLang = getUserLang(message.author.id, db);
        let langPath = path.join(__dirname, 'locales', `${userLang}.json`);
        let languageFile = JSON.parse(fs.readFileSync(langPath, 'utf8'));

        
        message.reply(`${languageFile["main"].msg2} \`${config.prefix}help\``);
    }
});

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