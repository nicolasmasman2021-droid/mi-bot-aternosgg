const mineflayer = require('mineflayer');
const http = require('http');

// --- PÁGINA WEB FALSA PARA ENGAÑAR A RENDER ---
http.createServer((req, res) => {
    res.write("Bot Nicolas esta vivo");
    res.end();
}).listen(process.env.PORT || 3000, () => {
    console.log("Servidor web falso activado para Render.");
});
// ----------------------------------------------

function createBot() {
    const bot = mineflayer.createBot({
        host: 'lossahurysushijitos.aternos.me',
        port: 21146,
        username: 'Bot_Nicolas',
        version: '1.21.1'
    });

    bot.on('login', () => {
        console.log('¡Bot_Nicolas entró con éxito al servidor!');
    });

    bot.on('kick', (reason) => {
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
