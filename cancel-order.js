const Axios = require('axios');
const Crypto = require('crypto')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

var request = JSON.stringify({
    orderId: 'BACKEND-16a92e0f94e5f100' //NODE: We can only cancel orders that belong to the source associated with our API key
});

var signature = Crypto.createHmac('sha384', SECRET).update(request).digest('hex');

var a = Axios.post('http://localhost:8988/api/v1/order/cancel', request, // https:// for PROD
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