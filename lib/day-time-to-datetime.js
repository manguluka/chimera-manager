const config = require('config')

const TIMEZONE = config.get('timezone')

module.exports = function dayTimeToDatetime(day, time) {
  return new Date(`${day} ${time} ${TIMEZONE}`)
}
