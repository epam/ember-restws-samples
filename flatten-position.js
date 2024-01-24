const Axios = require('axios');
const Crypto = require('crypto')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

var positionSnapshot = JSON.stringify({
    projectionPath: "Source[FIXCLIENT1]/Symbol[MSFT]", // make sure it matches risk projections configured in ember.conf
    relative: false,
    size: 0,
    averageCost: 0,
    realizedPnL: 0,
});

var signature = Crypto.createHmac('sha384', SECRET).update(positionSnapshot).digest('hex');

Axios.post('http://localhost:8988/api/v1/position/adjust', positionSnapshot,
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