function calcRSI(prices) {
    let wins = 0;
    let loses = 0;

    for (let i = prices.length - 14; i < prices.length; i++) {
        const difference = prices[i] - prices[i - 1];

        if (difference >= 0) {
            wins += difference;
        } else {
            loses -= difference;
        }

        const relativeStrength = wins / loses;
        return 100 - 100 / (1 + relativeStrength);
    }
}

(async () => {
    const axios = require('axios');
    const candles = await axios.get(
        'https://api.binance.com/api/v3/klines?symbol=ETHBUSD&interval=1m'
    );
    const closes = candles.data.map((candle) => parseFloat(candle[4]));
    console.log(closes);

    const WebSocket = require('ws');
    const ws = new WebSocket(
        'wss://stream.binance.com:9443/ws/ethbusd@kline_1m'
    );

    const { Telegraf } = require('telegraf');
    const bot = new Telegraf('2113568022:AAGOSCqw3AGnQBx2mHS-WA7oA6kSILcvdK0');

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.k.x) {
            closes.push(parseFloat(data.k.c));
            const rsi = calcRSI(closes);
            console.log(rsi);
            
            if (rsi > 70) {
                bot.telegram.sendMessage(
                    2102300440,
                    `RSI: ${rsi}`,
                    'Overbought!'
                );
                console.log('Overbought!');
            } else if (rsi < 30) {
                bot.telegram.sendMessage(
                    2102300440,
                    `RSI: ${rsi}`,
                    'Oversold!'
                );
                console.log('Oversold!');
            }
        }
    };

    console.log('bot connected');
})();
