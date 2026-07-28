const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'lossahurysushijitos.aternos.me',
        port: 21146,
        username: 'Bot_Nicolas',
        version: '1.21.1' // <-- OBLIGATORIO: Forzar versión vieja para que los plugins traduzcan
    });

    bot.on('login', () => {
        console.log('¡Bot_Nicolas entró con éxito al servidor!');
    });

    bot.on('kick', (reason) => {
        // Convierte el objeto de razón de expulsión a texto legible
        console.log('Bot expulsado por:', JSON.stringify(reason));
    });

    bot.on('error', (err) => {
        console.log('Error de conexión:', err.message);
    });

    bot.on('end', () => {
        console.log('Conexión perdida. Reintentando en 15 segundos...');
        setTimeout(createBot, 15000);
    });
}

createBot();
