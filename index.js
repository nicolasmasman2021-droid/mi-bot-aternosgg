const mineflayer = require('mineflayer');
const http = require('http');

// ESCUDO GLOBAL TOTAL CONTRA CRASHES
process.on('unhandledRejection', (reason, promise) => { console.log('⚠️ Rechazo evitado:', reason); });
process.on('uncaughtException', (err) => { console.log('🚨 Crash evitado:', err.message); });

// SERVIDOR HTTP PARA ENGAÑAR A RENDER
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Nicolas activo y blindado.");
    res.end();
});
server.listen(process.env.PORT || 3000);

let bot;

function createBot() {
    if (bot) {
        try { bot.quit(); } catch(e) {}
    }

    bot = mineflayer.createBot({
        host: 'lossahurysushijitos.aternos.me',
        port: 21146,
        username: 'Bot_Nicolas',
        version: '1.21.1',
        hideErrors: true
    });

    // PARCHE DE FÍSICAS PARA ENTRAR A LA 1.26.2 sin trabarse
    bot.on('spawn', () => {
        if (bot.physics) {
            bot.physics.enabled = false; 
            console.log('✅ ¡Bot_Nicolas en el juego y sin físicas!');
        }
    });

    bot.on('login', () => { console.log('¡Conectado al servidor!'); });
    bot.on('kick', (reason) => { console.log('Expulsado por:', JSON.stringify(reason)); });
    bot.on('error', (err) => { console.log('Error de red:', err.message); });
    
    bot.on('end', () => {
        console.log('Conexión perdida. Reintentando en 15 segundos...');
        setTimeout(createBot, 15000);
    });
}

createBot();
