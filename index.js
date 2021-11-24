// ETHBUSD
// min 4129
// max 4314

// token -> 2113568022:AAGOSCqw3AGnQBx2mHS-WA7oA6kSILcvdK0
// chat id -> 2102300440

const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1h');

const { Telegraf } = require('telegraf');
const bot = new Telegraf('2113568022:AAGOSCqw3AGnQBx2mHS-WA7oA6kSILcvdK0');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const valor = parseFloat(data.k.c)
    console.log('Current Value ' + valor);

    if (valor >= 4314) {
        bot.telegram.sendMessage(2102300440, 'ETHBUSD: ' + valor + ' - Time to Sell!');
        console.log('Sell');
    }
    else if (valor <= 4129) {
        bot.telegram.sendMessage(2102300440, 'ETHBUSD: ' + valor + ' - Time to Buy!');
        console.log('Buy');
    }
}

console.log("bot connected");



