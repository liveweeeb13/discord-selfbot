const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const logMessage = require('../utils/logs');

const dbPath = path.join(__dirname, '..', 'db', 'lang.json');

function getLangDb() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ fr: [], en: [] }, null, 0), 'utf-8');
    }
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function saveLangDb(db) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 0), 'utf-8');
}

function getUserLang(userId, db) {
    for (const lang of Object.keys(db)) {
        if (db[lang].includes(userId)) return lang;
    }
    return null;
}

function langCodeTOLangName(c) { // c = Lang Code
    const l = { // l = Langages
        fr: "Français",
        en: "English"
    }
    return l[c];
}

function setUserLang(userId, lang, db) {
    for (const l of Object.keys(db)) {
        db[l] = db[l].filter(id => id !== userId);
    }
    if (!db[lang]) db[lang] = [];
    db[lang].push(userId);
}

module.exports = {
    name: 'lang',
    description: {
        en: 'Choose the bot language (for yourself)',
        fr: 'Choisis la langue du bot (pour toi)'
    },
    async execute(message, args, client, lang, lf) {
        const userId = message.author.id;
        const supportedLangs = ["fr", "en"];
        const defaultLang = config.defaultLang || "en";

        const db = getLangDb();
        let userLang = getUserLang(userId, db);

        if (!userLang) {
            userLang = defaultLang;
            setUserLang(userId, userLang, db);
            saveLangDb(db);
        }

        if (args.length === 0) {
            return message.reply(`🌐 ${lf["lang"].msg2}: \`${userLang}\``);
        }

        const chosenLang = args[0].toLowerCase();

        if (!supportedLangs.includes(chosenLang)) {
            return message.reply(`${lf["lang"].msg1}: \`${supportedLangs.join(" | ")}\``);
        }

        setUserLang(userId, chosenLang, db);
        saveLangDb(db);

        await message.reply(`✅ \`${userLang}\` → \`${chosenLang}\``);
        await logMessage(message);
    }
};