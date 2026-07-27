const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'TU_IP_DE_ATERNOS.aternos.me', // <-- CAMBIA ESTO POR TU IP
        username: 'Bot24Siete',
        version: '1.21.1' // Nota abajo
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
