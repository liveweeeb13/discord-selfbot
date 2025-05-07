const math = require("mathjs");
const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: "maths",
    aliases: ["math", "calcul"],
    description: {
        fr: "Fait un calcul.",
        en: "Do a calculation."
    },
    async execute(message, args,c,lang,lf) {
        if (!args.length) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <${lf['maths'].msg1}>\``)
        }

        if (args[0].toLowerCase() === "help") {
            return message.reply(`\`\`\`${lf['maths'].msg2}\`\`\``);
        }

        const input = args.join(" ")
            .replace(/,/g, ".")
            .replace(/pi/gi, "pi");

        try {
            const result = math.evaluate(input);
            message.reply(`\`${result}\``);
        } catch (err) {
            message.reply(lf['maths'].msg3);
        }

        await logMessage(message)
    }
};
