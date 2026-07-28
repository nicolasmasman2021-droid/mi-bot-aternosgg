const mineflayer = require('mineflayer');
const http = require('http');

// ESCUDO DE RED GLOBAL
process.on('unhandledRejection', (reason) => { console.log('⚠️ Ajuste de red evitado:', reason); });
process.on('uncaughtException', (err) => { console.log('🚨 Error evitado:', err.message); });

// ENGAÑO PARA EL PUERTO DE RENDER
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Nicolas activo y parcheado.");
    res.end();
}).listen(process.env.PORT || 3000);

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
        hideErrors: true,
        // PARCHE CRÍTICO: Desactiva los componentes que rompen la conexion en la 1.26
        plugins: {
            conversions: false,
            furnace: false,
            enchanting_table: false,
            anvil: false,
            villager: false,
            placeBlock: false,
            chest: false
        }
    });

    // Forzar el apagado de fisicas apenas toque la fase de configuracion del servidor
    bot.on('stateChanged', (state) => {
        if (state === 'configuration' || state === 'play') {
            if (bot.physics) bot.physics.enabled = false;
        }
    });

    bot.on('spawn', () => {
        if (bot.physics) bot.physics.enabled = false;
        console.log('✅ ¡Bot_Nicolas se conectó exitosamente al servidor!');
    });

    bot.on('login', () => { 
        console.log('📬 Handshake de red completado.'); 
    });

    bot.on('kick', (reason) => { 
        console.log('❌ Servidor rechazó conexión por:', JSON.stringify(reason)); 
    });

    bot.on('error', (err) => { 
        console.log('⚠️ Reintentando por error:', err.message); 
    });
    
    bot.on('end', () => {
        console.log('🔄 Buscando reconexión en 15 segundos...');
        setTimeout(createBot, 15000);
    });
}

createBot();
