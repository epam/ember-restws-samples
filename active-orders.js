const Request = require("request");
const CryptoJS = require('crypto-js')

const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

var request = JSON.stringify({
    // traderId: "11336866712", // optional filter
    // account: "GOLD",         // optional filter
    // exchangeId: "CME"        // optional filter
});

var signature = CryptoJS.HmacSHA384(request, SECRET).toString(CryptoJS.enc.Hex);

var a = Request.post(
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "X-SIGNATURE": signature,
        },
        url: 'http://localhost:8988/api/v1/orders', // https:// for PROD
        body: request
    },
    function optionalCallback(err, httpResponse, body) {
        if (err)
            return console.error('Submit failed:', err);

        console.log('Server responded with [%s] %s', httpResponse.statusCode, body);
    }
);
