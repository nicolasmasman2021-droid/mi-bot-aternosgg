const mineflayer = require('mineflayer');
const http = require('http');

// 1. ESCUDO GLOBAL ANTI-CRASH (Evita que el código se muera por errores desconocidos)
process.on('unhandledRejection', (reason, promise) => {
    console.log('⚠️ Rechazo no manejado en:', promise, 'razón:', reason);
});
process.on('uncaughtException', (err) => {
    console.log('🚨 Excepción no capturada críticamente evitada:', err.message);
});

// 2. PÁGINA WEB FALSA CON RESPUESTA RÁPIDA PARA RENDER
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Nicolas esta vivo y protegido contra errores.");
    res.end();
});

server.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Servidor HTTP de respaldo activo en puerto", process.env.PORT || 3000);
});

// 3. SISTEMA DEL BOT CON RECONEXIÓN INTELIGENTE
let bot;

function createBot() {
    console.log('🔄 Intentando conectar a Bot_Nicolas...');
    
    // Si ya existía una instancia del bot vieja, la destruimos por completo antes de reintentar
    if (bot) {
        try { bot.quit(); } catch(e) {}
    }

    bot = mineflayer.createBot({
        host: 'lossahurysushijitos.aternos.me',
        port: 21146,
        username: 'Bot_Nicolas',
        version: '1.21.1',
        hideErrors: true // Oculta spam innecesario en la consola de Render
    });

    // Éxito al entrar
    bot.on('login', () => {
        console.log('✅ ¡Bot_Nicolas entró con éxito al servidor!');
    });

    // Control si Aternos lo bota o apaga (Maneja el formato de texto de Minecraft)
    bot.on('kick', (reason) => {
        let kickMessage = typeof reason === 'object' ? JSON.stringify(reason) : reason;
        console.log('❌ Bot expulsado del servidor por:', kickMessage);
    });

    // Captura fallas de internet, DNS caídas o rechazo de puerto de Aternos
    bot.on('error', (err) => {
        console.log('⚠️ Error de conexión de red detectado:', err.message);
    });

    // Escudo para cuando el servidor se reinicia o se cae de la nada
    bot.on('end', () => {
        console.log('🛑 Conexión perdida con Aternos. Reintentando de forma segura en 20 segundos...');
        setTimeout(createBot, 20000); // 20 segundos da tiempo a que el servidor respire si se reinició
    });
}

// Arrancar el bucle principal por primera vez
createBot();
