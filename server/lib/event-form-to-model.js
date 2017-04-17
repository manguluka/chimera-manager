const dollarsToCents = require('../../lib/dollars-to-cents')
const dayTimeToDatetime = require('../../lib/day-time-to-datetime')

module.exports = function eventFormToModel(body) {
  const {
    title,
    description,

    attendeeMin,
    attendeeMax,

    price,
    materialFee,
    memberPrice,

    endTime,
    endDay,
    startTime,
    startDay,
  } = body

  return {
    title,
    description,

    attendeeMin: Number(attendeeMin),
    attendeeMax: Number(attendeeMax),

    price: dollarsToCents(price),
    memberPrice: dollarsToCents(memberPrice),
    materialFee: dollarsToCents(materialFee),

    startsAt: dayTimeToDatetime(startDay, startTime),
    endsAt: dayTimeToDatetime(endDay, endTime),
  }
}
