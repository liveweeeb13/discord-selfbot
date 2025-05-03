const logMessage = require('../utils/logs')

module.exports = {
    name: 'respire',
    description: 'Respirer',
    async execute(message) {
        const responses = [
            "Tu viens de respirer. GG 🫁",
            "Respiration réussie ✔️",
            "N'oublie pas d'expirer aussi ! 😮‍💨",
            "Inspire... expire... Voilà, tu vas mieux 😌",
            "Bien joué, une respiration de plus !"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        await message.reply(response);
        await logMessage(message);
    }
}
