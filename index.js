const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1h');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const valor = parseFloat(data.k.c)
    console.log('Current Value ' + valor);

    if (valor >= 4314) {
        console.log('Sell');
    }
    else if (valor <= 4129) {
        console.log('Buy');
    }
}

// ETHBUSD
// min 4129
// max 4314
console.log("bot connected");


