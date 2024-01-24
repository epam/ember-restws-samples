const Request = require("request");
const CryptoJS = require('crypto')

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

var signature = crypto.createHmac('sha384', SECRET).update(positionSnapshot).digest('hex');

var a = Request.post(
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "X-SIGNATURE": signature,
        },
        url: 'http://localhost:8988/api/v1/position/adjust', // https:// for PROD
        body: positionSnapshot
    },
    function optionalCallback(err, httpResponse, body) {
        if (err)
            return console.error('Submit failed:', err);

        console.log('Server responded with [%s] %s', httpResponse.statusCode, body);
    }
);
