const WebSocket = require('ws')
const Crypto = require('crypto')
const { v4: GUID } = require('uuid');

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

const salt = GUID();
const now = new Date();


const data = API_KEY + '/' + salt + '/' + now.toISOString();
const signature = Crypto.createHmac('sha384', SECRET).update(data).digest('hex');
const auth_request = {
    $type:        'AuthRequest',
    apiKey:       API_KEY,
    signature:    signature,
    salt:         salt,
    timestamp:    now
};

const order = {
    $type:              'OrderNewRequest',
    orderId:            GUID(),
    originalTimestamp:  now,
    side:              'BUY',
    quantity:           100,
    symbol:            'BTC/USD',
    orderType:         'MARKET',
    destinationId:     'SIM',
    exchangeId:        'FILL'
};

const wss = new WebSocket('ws://localhost:8988/api/v1') // Use wss:// for PROD
wss.on('message', (msg) => console.log(JSON.parse(msg)))
wss.on('open', () => {
    wss.send(JSON.stringify(auth_request)); // Step 1: Authenticate
    wss.send(JSON.stringify(order)); // Step 2: send order
})

