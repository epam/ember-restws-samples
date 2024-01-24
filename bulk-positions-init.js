const Axios = require('axios');
const Crypto = require('crypto')

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
    const signature = Crypto.createHmac('sha384', SECRET).update(requestAsText).digest('hex');

    Axios.post('http://localhost:8988/api/v1/position/adjust', requestAsText, // https:// for PROD
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

    
}
