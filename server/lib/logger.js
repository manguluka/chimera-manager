const config = require('config')
const winston = require('winston')
const logdna = require('logdna')
const LogDnaTransport = logdna.WinstonTransport

const ENV = config.get('env')

const transports = [
  new winston.transports.Console({
    colorize: ENV === 'development',
    prettyPrint: ENV === 'development',
  }),
]

if (ENV === 'production') {
  transports.push(
    new LogDnaTransport({
      key: config.get('logDnaKey'),
      hostname: config.get('host'),
      app: config.get('appName'),
      index_meta: true,
    })
  )
}

module.exports = new winston.Logger({ transports })
