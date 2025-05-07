const logMessage = require('../utils/logs')

module.exports = {
    name: 'ping',
    description: {
        fr: 'Affiche les latences.',
        en: 'Shows latency'
    },
    async execute(message,args,c,lang,lf) {
        const startTime = Date.now();
        const initialPing = Math.abs(Date.now() - message.createdTimestamp);
        
        await message.channel.sendTyping();
        const testingMessage = await message.reply({ content: `*${lf['ping'].msg1}*` });

        const endTime = Date.now();
        const botPing = Math.abs(endTime - startTime);
        const apiPing = Math.round(message.client.ws.ping);
        const avgPing = Math.round((botPing + apiPing) / 2);

        /**
         * Détermine la couleur/emoji en fonction de la latence
         * @param {string} type - Type de retour (img, emoji, hexColor)
         * @param {number} ping - Valeur de latence
         * @param {string} [forme=circle] - Forme de l'emoji (circle ou square)
         * @returns {string} Retourne l'élément demandé
         */
        function getPingColor(type, ping, forme = 'circle') {
            let lvlPing_;
            
            if (ping <= 0) {
                lvlPing_ = -1;
            } else if (ping > 0 && ping <= 500) {
                lvlPing_ = 0; 
            } else if (ping > 500 && ping <= 1000) {
                lvlPing_ = 1;
            } else if (ping > 1000 && ping <= 2250) {
                lvlPing_ = 2;
            } else if (ping > 2250 && ping <= 5000) {
                lvlPing_ = 3; 
            } else {
                lvlPing_ = 4;
            }

            const styles = {
                "-1": { hex: '#d3d3d3', square: '⬜', circle: '⚪' },
                0: { hex: '#40d509', square: '🟩', circle: '🟢' },
                1: { hex: '#ffd817', square: '🟨', circle: '🟡' },
                2: { hex: '#f99325', square: '🟧', circle: '🟠' },
                3: { hex: '#d00f0f', square: '🟥', circle: '🔴' },
                4: { hex: '#400106', square: '⬛', circle: '⚫' }
            };

            switch (type) {
                case 'img':
                    return `https://singlecolorimage.com/get/${styles[lvlPing_].hex.replace('#', '')}`;
                case 'emoji':
                    return styles[lvlPing_][forme];
                case 'hexColor':
                    return styles[lvlPing_].hex;
                default:
                    return styles[lvlPing_].circle;
            }
        }

        const emojis = {
            bot: getPingColor('emoji', botPing),
            api: getPingColor('emoji', apiPing),
            time: getPingColor('emoji', initialPing),
            avg: getPingColor('emoji', avgPing)
        };
        const pingImage = getPingColor('img', avgPing) + "/200x40.png";

        await message.reply({
            content: [
                `${lf['ping'].msg2}: \`${botPing}ms\` ${emojis.bot}`,
                `${lf['ping'].msg3}: \`${apiPing}ms\` ${emojis.api}`,
                `${lf['ping'].msg4}: \`${initialPing}ms\` ${emojis.time}`,
       //       `${lf['ping'].msg5}: \`${avgPing}ms\` ${emojis.avg}`
            ].join('\n'),
            files: [pingImage]
        }).then(() => testingMessage.delete());


        logMessage(message);
    }
};