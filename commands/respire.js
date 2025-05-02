const { logMessage } = require('../utils/logs')

module.exports = {
    name: 'respire',
    description: 'Respirer',
    async execute(message) {
        message.reply("Tu viens de respirer. GG");
        await logMessage(message);
    }
};
