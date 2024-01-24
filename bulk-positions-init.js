const Request = require("request");
const CryptoJS = require('crypto')

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'

const users = [ 'BOB', 'JOHN', 'MILES', 'PAUL']

for (user of users) {
    setSourceCurrencyPosition(user, 1000000)
    setSourceAccountCurrencyPosition (user, user + '1', 500000)
    setSourceAccountCurrencyPosition (user, user + '2', 500000)
}


function setSourceCurrencyPosition (user, amount) {
    setPosition({
        projectionPath: "Source[" + user + "]/Currency[USD]",
        size: +amount,
        relative: false,
        last: true
    });
}

function setSourceAccountCurrencyPosition (user, account, amount) {
    setPosition({
        projectionPath: "Source[" + user + "]/Account[" + account + "]/Currency[USD]",
        size: +amount,
        relative: false,
        last: true
    });
}

function setPosition (request) {
    const requestAsText = JSON.stringify(request);
    const signature = crypto.createHmac('sha384', SECRET).update(requestAsText).digest('hex');

    
    Request.post(
        {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
                "X-SIGNATURE": signature,
            },
            url: 'http://localhost:8988/api/v1/position/adjust', // https:// for PROD
            body: requestAsText
        },
        function optionalCallback(err, httpResponse, body) {
            if (err)
                return console.error('Request failed:', err);
    
            console.log('Server responded with [%s] %s', httpResponse.statusCode, body);
        }
    );
    
}
