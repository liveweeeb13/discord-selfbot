const math = require("mathjs");
const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: "maths",
    aliases: "math",
    description: "🆕 Fais un calcul.",
    async execute(message, args) {
        if (!args.length) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <calcul ou help>\``)
        }

        if (args[0].toLowerCase() === "help") {
            return message.reply(`\`\`\`
📘 Aide : Commande !math

Syntaxe : !math <expression>

Opérations supportées :
- +  : addition
- -  : soustraction
- *  : multiplication
- /  : division
- ^  : puissance (ex: 2^3 = 8)
- sqrt(x) : racine carrée
- pi ou PI : π
- n! : factorielle (ex: 5! = 120)
- Fonctions : sin(x), cos(x), tan(x), log(x), abs(x), round(x), floor(x), ceil(x)
\`\`\` `);
        }

        const input = args.join(" ")
            .replace(/,/g, ".")
            .replace(/pi/gi, "pi");

        try {
            const result = math.evaluate(input);
            message.reply(`\`${result}\``);
        } catch (err) {
            message.reply("❌ Erreur dans le calcul. Vérifie ta syntaxe.");
        }

        await logMessage(message)
    }
};
