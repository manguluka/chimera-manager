module.exports = function dayTimeToDatetime(day, time, timezone = 'PST') {
  return new Date(`${day} ${time} ${timezone}`)
}
