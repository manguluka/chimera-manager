const config = require('config')
const winston = require('winston')
const logdna = require('logdna')
const LogDnaTransport = logdna.WinstonTransport

const ENV = config.get('env')
const LOG_LEVEL = config.get('logging.level')

const transports = [
  new winston.transports.Console({
    level: LOG_LEVEL,
    colorize: ENV === 'development',
    prettyPrint: ENV === 'development',
  }),
]

if (ENV === 'production') {
  transports.push(
    new LogDnaTransport({
      key: config.get('logging.logDnaKey'),
      hostname: config.get('host'),
      app: config.get('appName'),
      index_meta: true,
    })
  )
}

module.exports = new winston.Logger({ transports })
