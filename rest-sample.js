const Request = require("request");
const CryptoJS = require('crypto-js')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

var order = JSON.stringify({
    orderId: "11336866712",
    timestamp: "2020-12-15T17:34:26.839Z",
    side: "BUY",
    quantity: 100,
    symbol: "ESZ21",
    orderType: "MARKET",
    destinationId: "CME"
});

var signature = CryptoJS.HmacSHA384(order, SECRET).toString(CryptoJS.enc.Hex);

var a = Request.post(
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "X-SIGNATURE": signature,
        },
        url: 'http://localhost:8988/api/v1/order/new', // https:// for PROD
        body: order
    },
    function optionalCallback(err, httpResponse, body) {
        if (err)
            return console.error('Submit failed:', err);

        console.log('Server responded with [%s] %s', httpResponse.statusCode, body);
    }
);
