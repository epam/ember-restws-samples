const WebSocket = require('ws')
const CryptoJS = require('crypto-js')
const { v4: GUID } = require('uuid');

const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

const salt = GUID();
const timestamp = new Date();

const data = API_KEY + '/' + salt + '/' + timestamp.getTime();
const signature = CryptoJS.HmacSHA384(data, SECRET).toString(CryptoJS.enc.Hex);
const auth_request = {
    $type:        'AuthRequest',
    apiKey:       API_KEY,
    signature:    signature,
    salt:         salt,
    timestamp:    timestamp.toISOString()
};

const order = {
    $type:          'OrderNewRequest',
    orderId:        GUID(),
    timestamp:      '2020-12-15T17:34:26.839Z',
    side:           'BUY',
    quantity:       100,
    symbol:         'BTC/USD',
    orderType:      'MARKET',
    destinationId:  'SIM',
    exchangeId:     'FILL'
};

const wss = new WebSocket('ws://localhost:8988/api/v1') // Use wss:// for PROD
wss.on('message', (msg) => console.log(JSON.parse(msg)))
wss.on('open', () => {
    wss.send(JSON.stringify(auth_request)); // Step 1: Authenticate
    wss.send(JSON.stringify(order)); // Step 2: send order
})

