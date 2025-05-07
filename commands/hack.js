const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'hack',
    description: {
        fr: 'Simule un hack.',
        en: 'Simulate a hack.'
    },
    async execute(message, args,client,lang,lf) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply(`${lf['constantes'].baduse} \`${config.prefix}${this.name} <@${lf['constantes'].usr}>\``)
        }

        if (target.id === message.client.user.id) {
            return message.reply(lf['hack'].msg1);
        }

        if (target.id === message.author.id) {
            return message.reply(lf['hack'].msg2);
        }

        await message.channel.sendTyping();
        const initialMessage = await message.reply(`\`\`${lf['hack'].msg3} ${target.username}...\`\``);

        const steps = [
            { delay: 2000, text: `\`\`${lf['hack'].msg4} ${target.username}...\`\`` },
            { delay: 4000, text: `\`\`${lf['hack'].msg5}\`\`` },
            { delay: 6000, text: `\`\`${lf['hack'].msg6}\`\`` },
            { delay: 8000, text: `\`\`${lf['hack'].msg7} :\`\` \`\`\`\n${generateFakePassword()}\`\`\`` },
            { delay: 10000, text: `\`\`${lf['hack'].msg8}\`\`` },
            { delay: 12000, text: `\`\`${lf['hack'].msg9}\`\`` },
            { delay: 14000, text: `\`\`${lf['hack'].msg10}\`\`` },
            { delay: 16000, text: `\`\`${lf['hack'].msg11.replace(/\[target.username\]/g, target.username)}\`\`` }
        ];

        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, step.delay - (step === steps[0] ? 0 : steps[steps.indexOf(step) - 1].delay)));
            await message.channel.send(step.text);
        }

        setTimeout(() => initialMessage.delete().catch(console.error), 4000);

        await logMessage(message);
    }
};

// Génère un mot de passe aléatoire factice pour l'effet
function generateFakePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 22; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}