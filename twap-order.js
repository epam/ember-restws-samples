const Axios = require('axios');
const Crypto = require('crypto')
const { v4: GUID } = require('uuid');

// Do not submit actual keys that give access to anything of value to GIT :-)
const API_KEY = 'w6AcfksrG7GiEFoN'
const SECRET = 'gZ0kkI9p8bHHDaBjO3Cyij87SrToYPA3'
const now = new Date();

var orderID = GUID()

var order = JSON.stringify({
    orderId: orderID,
    originalTimestamp: now,
    side: "BUY",
    quantity: 1,
    limitPrice: 3700,
    symbol: "BTCUSD",
    orderType: "LIMIT",
    destinationId: "TWAP",
    timeInForce: "GOOD_TILL_CANCEL",
    account: "TEST",
    attributes: [{"key": 6002, "value": "05:03:30"}, {"key": 6023, "value": "25"}]
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


// sleep for 1 sec and then request order status
setTimeout(() => {

  var request = JSON.stringify({
      orderId: orderID
  });

  signature = Crypto.createHmac('sha384', SECRET).update(request).digest('hex');

  a = Axios.post('http://localhost:8988/api/v1/order/status', request, // https:// for PROD
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

}, 1000);
