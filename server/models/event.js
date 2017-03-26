const dayTimeToDatetime = require('../../lib/day-time-to-datetime')
const dollarsToCents = require('../../lib/dollars-to-cents')
const marked = require('marked')
const moment = require('moment')
const Model = require('../lib/model')

function dayString(date) {
  return moment(date).format('YYYY-MM-DD')
}

function timeString(date) {
  return moment(date).format('HH:mm')
}

class Event extends Model {


  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  toString() {        return this.title }
  get cancelled() {   return Boolean(this.cancelledAt) }
  get startDay() {    return dayString(this.startsAt) }
  get startTime() {   return timeString(this.startsAt) }
  get endDay() {      return dayString(this.endsAt) }
  get endTime() {     return timeString(this.endsAt) }
  get visibility() {  return this.internal ? 'internal (members only)' : 'public' }
  get descriptionHtml() { return marked(this.description) }


  get attendeeLimit() {
    const min = this.attendeeMin
    const max = this.attendeeMax

    let msg = ''
    if (min || max) {
      if (min) msg += `${min} min`
      if (min && max) msg += ' - '
      if (max) msg += `${max} max`
    } else {
      msg = 'no limit'
    }

    return msg
  }

  get dateRange() {
    let range = ''
    range += moment(this.startsAt).format('M/D/YY')
    range += ' from '
    range += moment(this.startsAt).format('h:mma')
    range += '-'
    range +=  moment(this.endsAt).format('h:mma')
    return range
  }

  get priceDollars() {
    return this.price ? this.price / 100 : 0.00
  }

  get memberPriceDollars() {
    return this.memberPrice ? this.memberPrice / 100 : 0.00
  }

  get materialFeeDollars() {
    return this.materialFee ? this.materialFee / 100 : 0.00
  }


  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  //static get categories() {
    //return [ 'event', 'class', 'training', 'meetup' ]
  //}

  static toModelFromForm(fields) {

    const {
      title,
      description,

      attendeeMin,
      attendeeMax,

      draft,
      internal,

      price,
      materialFee,
      memberPrice,

      endTime,
      endDay,
      startTime,
      startDay,
    } = fields

    return {
      title,
      description,

      attendeeMin: Number(attendeeMin),
      attendeeMax: Number(attendeeMax),

      draft,
      internal,

      price: dollarsToCents(price),
      memberPrice: dollarsToCents(memberPrice),
      materialFee: dollarsToCents(materialFee),

      startsAt: dayTimeToDatetime(startDay, startTime),
      endsAt: dayTimeToDatetime(endDay, endTime),
    }
  }

}

Event.configure({
  table: 'events',
  columns: [
    'id',

    // Basic details
    'title',
    'description',
    'photo_url',
    'meetup_url',
    'draft',
    'internal',
    'category',

    // Attendees
    'attendee_min',
    'attendee_max',

    // Pricing
    'price',
    'member_price',
    'material_fee',

    // Dates
    'starts_at',
    'ends_at',
    'cancelled_at',

    // Dates
    'created_at',
    'updated_at',
  ]
})

module.exports = Event
