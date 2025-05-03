const logMessage = require('../utils/logs')
const config = require('../config.json')

module.exports = {
    name: 'hack',
    description: 'Simule un hack.',
    async execute(message) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply(`❌ Utilisation incorrecte : \`${config.prefix}${this.name} <@user>\``)
        }

        if (target.id === message.client.user.id) {
            return message.reply("❌ Impossible de me hacker moi-même ! 😎");
        }

        if (target.id === message.author.id) {
            return message.reply("❌ Tu veux vraiment te hacker toi-même ? 🤔");
        }

        await message.channel.sendTyping();
        const initialMessage = await message.reply(`\`\`💻 Initialisation du hack sur ${target.username}...\`\``);

        const steps = [
            { delay: 2000, text: `\`\`🔍 Analyse du système de ${target.username}...\`\`` },
            { delay: 4000, text: `\`\`🛠️ Exploitation des failles de sécurité...\`\`` },
            { delay: 6000, text: `\`\`📡 Connexion au serveur principal...\`\`` },
            { delay: 8000, text: `\`\`🔑 Tentative de récupération du mot de passe :\`\` \`\`\`\n${generateFakePassword()}\`\`\`` },
            { delay: 10000, text: `\`\`💾 Téléchargement des données sensibles...\`\`` },
            { delay: 12000, text: `\`\`🍟 Injection de frites dans le système... 🍟\`\`` },
            { delay: 14000, text: `\`\`⚠️ Détection par l'antivirus !\`\`` },
            { delay: 16000, text: `\`\`❌ Hack interrompu. ${target.username} est trop fort(e) !\`\`` }
        ];

        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, step.delay - (step === steps[0] ? 0 : steps[steps.indexOf(step) - 1].delay)));
            await message.channel.send(step.text);
        }

     //   setTimeout(() => initialMessage.delete().catch(console.error), 18000);

        await logMessage(message);
    }
};

// Génère un mot de passe aléatoire factice pour l'effet
function generateFakePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}