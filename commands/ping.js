const { logMessage } = require('../utils/logs')

module.exports = {
    name: 'ping',
    description: 'Tester le ping',
    async execute(message) {
        let ping = Date.now() - message.createdTimestamp;
        let roundedping = ping < 0 ? Math.round(ping * -1) : ping;


        message.channel.send(`Mon ping est de ${roundedping}ms`);
        await logMessage(message);
    }
}