const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'lossahurysushijitos.aternos.me',
        port: 21146,
        username: 'Bot_Nicolas',
        version: '1.21.1'
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        bot.chat('Sigo activo');
    });

    bot.on('kick', (reason) => console.log('Expulsado:', reason));
    bot.on('error', (err) => console.log('Error:', err));
    bot.on('end', () => {
        console.log('Bot desconectado, reintentando en 30 segundos...');
        setTimeout(createBot, 30000);
    });
}

createBot();
