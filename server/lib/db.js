const config = require('config')
const Connect = require('pg-promise')()

const connection = Connect({
  database: config.get('db.name'),
  host: config.get('db.host'),
  password: config.get('db.password'),
  port: config.get('db.port'),
  user: config.get('db.user'),
})

module.exports = connection

//const config = require('config')
//const Pool = require('pg').Pool

//const connection = new Pool({
  //database: config.get('db.name'),
  //host: config.get('db.host'),
  //password: config.get('db.password'),
  //port: config.get('db.port'),
  //user: config.get('db.user'),
//})

//module.exports = connection
