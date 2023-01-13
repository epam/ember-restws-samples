const Request = require("request");
const CryptoJS = require('crypto-js')

const API_KEY = 'TbrzsXVKb2nDJn9t'
const SECRET = '5fMqCLguqmuWsRXBgMg5NQNPh9TEK6tp'


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
    const signature = CryptoJS.HmacSHA384(requestAsText, SECRET).toString(CryptoJS.enc.Hex);
    
    Request.post(
        {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
                "X-SIGNATURE": signature,
            },
            url: 'http://3.139.128.224:8987/api/v1/position/adjust', // https:// for PROD
            body: requestAsText
        },
        function optionalCallback(err, httpResponse, body) {
            if (err)
                return console.error('Submit failed:', err);
    
            console.log('Server responded with [%s] %s', httpResponse.statusCode, body);
        }
    );
    
}
