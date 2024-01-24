const Axios = require('axios');
const Crypto = require('crypto')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'
const now = new Date();

var order = JSON.stringify({
    orderId: "11336866712",
    originalTimestamp: now,
    side: "BUY",
    quantity: 100,
    symbol: "ESZ21",
    orderType: "MARKET",
    destinationId: "CME"
});

var signature = Crypto.createHmac('sha384', SECRET).update(order).digest('hex');

var a = Axios.post('http://localhost:8988/api/v1/order/new', order, // https:// for PROD
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "X-SIGNATURE": signature,
        },
    }
).then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});