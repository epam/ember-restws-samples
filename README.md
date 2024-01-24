Documentaion lives on http://ember.deltixlab.com/api



# How to run thes samples

## Prerequisite

Install NodeJS 


## Add necessary modules

```sh
npm install uuid
npm install axios
npm install ws
```

## Run the sample

This particular samples fetches per-exchange positions (assuming Ember is configured to track `Exchange/Symbol` projection).

```sh
node positions.js
```

You should see gateway responding with HTTP 200 and requested positions in JSON format:

```json
[{"$type":"PositionReport","requestId":"9482b2b9ca0116b14dd3b373e50b9273747a","found":true,"projection":"Exchange/Symbol","last":false, "exchangeId":"NIAGARA","size":0,"averageCost":0,"realizedPnL":0,"unrealizedPnL":0,"marketValue":0,"symbol":"BCH/BTC","timestamp":"2023-01-20T15:34:17.907Z"}, {"$type":"PositionReport","requestId":"9482b2b9ca0116b14dd3b373e50b9273747a","found":true,"projection":"Exchange/Symbol","last":false, "exchangeId":"NIAGARA","size":0,"averageCost":0,"realizedPnL":0,"unrealizedPnL":0,"marketValue":0,"symbol":"ETH/USD","timestamp":"2023-01-20T15:34:17.907Z"}, {"$type":"PositionReport","requestId":"9482b2b9ca0116b14dd3b373e50b9273747a","found":true,"projection":"Exchange/Symbol","last":false, "exchangeId":"NIAGARA","size":0,"averageCost":0,"realizedPnL":0,"unrealizedPnL":0,"marketValue":0,"symbol":"BCH/USD","timestamp":"2023-01-20T15:34:17.907Z"}, ...]
```



