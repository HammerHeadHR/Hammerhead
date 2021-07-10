const { Client } = require('pg')
const pgConfig = require('./config.js');
const client = new Client(pgConfig)

client.connect()

module.exports = {
  client,
}