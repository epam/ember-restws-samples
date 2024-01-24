const Axios = require('axios');
const Crypto = require('crypto')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

var request = JSON.stringify({
    projection: "Exchange/Symbol", // make sure it matches risk projections configured in ember.conf

    // traderId: "11336866712", // optional filter
    // account: "GOLD",         // optional filter
    // exchangeId: "CME"        // optional filter
});

var signature = Crypto.createHmac('sha384', SECRET).update(request).digest('hex');

var a = Axios.post('http://localhost:8988/api/v1/positions', request, // https:// for PROD
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "X-SIGNATURE": signature,
        }
    }
).then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});