const Activity = require('./activity')
const dayTimeToDatetime = require('../../lib/day-time-to-datetime')
const dollarsToCents = require('../../lib/dollars-to-cents')
const marked = require('marked')
const moment = require('moment')
const connection = require('../lib/db')
const Model = require('simple-sql-model')
const Instructor = require('./instructor')
const User = require('./user')

function dayString(date) {
  return moment(date).format('YYYY-MM-DD')
}

function timeString(date) {
  return moment(date).format('HH:mm')
}

class Event extends Model {

  //constructor() {
    //super(arguments)
  //}

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

  /**
   * Return all Instructor User instances
   * for this Event.
   */
  async instructors() {
    const instructors = await Instructor.findMany({
      where: { eventId: { equals: this.id } },
    })
    return await Promise.all(
      instructors.map((relation) => {
        return User.findOne(relation.userId)
      })
    )
  }

  get url() { return `/events/${this.id}` }


  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static async cancel(id) {
    const event = await this.findOne(id)
    await event.update({ cancelledAt: new Date() })
    return event
  }

  static get categories() {
    return [ 'event', 'class', 'meetup', 'training' ]
  }

  static get url() { return '/events'}

  static async afterCreate(model, fields) {
    await Activity.record({
      action: 'created',
      model,
      extraInfo: {
        fields,
      },
    })
  }

  static async afterUpdate(model, fields) {
    await Activity.record({
      action: 'updated',
      model,
      extraInfo: {
        fields,
      },
    })
  }

  static toModelFromForm(fields) {

    const {
      title,
      description,

      attendeeMin,
      attendeeMax,

      category,
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

      category,
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
  connection,
  table: 'events',
  columns: [
    'id',

    // Basic details
    'title',
    'description',
    'photoUrl',
    'meetupUrl',
    'draft',
    'internal',
    'category',

    // Attendees
    'attendeeMin',
    'attendeeMax',

    // Pricing
    'price',
    'memberPrice',
    'materialFee',

    // Dates
    'startsAt',
    'endsAt',
    'cancelledAt',

    // Dates
    'createdAt',
    'updatedAt',
  ]
})

module.exports = Event
