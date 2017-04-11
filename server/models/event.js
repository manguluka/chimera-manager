const dayTimeToDatetime = require('../../lib/day-time-to-datetime')
const dollarsToCents = require('../../lib/dollars-to-cents')
const marked = require('marked')
const moment = require('moment')
const connection = require('../lib/db')
const Model = require('simple-sql-model')

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
  get free() {        return Boolean(!this.price && !this.memberPrice) }
  get visibility() {
    return this.internal ?
      'internal (members only)' :
      'public'
  }

  get future() {
    console.log(this.startsAt, new Date())
    return Boolean(this.startsAt >= new Date())
  }

  get descriptionHtml() {
    return marked(this.description)
  }

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
    range += ' '
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
    const instructors = await require('./instructor').findMany({
      where: { eventId: { equals: this.id } },
    })
    return await Promise.all(
      instructors.map((relation) => {
        return require('./user').findOne(relation.userId)
      })
    )
  }

  async attendees() {
    return await require('./attendee').findMany({
      where: { eventId: { equals: this.id } },
    })
  }

  async activities() {
    return await require('./activity').forModel(this)
  }

  async cancel() {
    this.cancelledAt = new Date()
    return await this.save()
  }

  get url() { return `/events/${this.id}` }


  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static async future() {
    return await this.findMany({
      where: {
        draft: { equals: false },
        //endsAt: { gte: new Date() },
      },
      order: {
        startsAt: 'asc',
      },
    })
  }

  static async cancel(id) {
    const event = await this.findOne(id)
    await event.update({ cancelledAt: new Date() })
    return event
  }

  static get url() { return '/events'}

  static async afterCreate(model, fields) {
    await require('./activity').record({
      action: 'created',
      model,
      extraInfo: {
        fields,
      },
    })
  }

static async afterUpdate(model, fields) { await require('./activity').record({
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

// Categories
Event.EVENT = 'event'
Event.CLASS = 'class'
Event.MEETUP = 'meetup'
Event.TRAINING = 'training'
Event.SIGNOFF = 'signoff'
Event.STAFF = 'staff'
Event.categories = [
  Event.EVENT,
  Event.CLASS,
  Event.MEETUP,
  Event.TRAINING,
  Event.SIGNOFF,
  Event.STAFF,
]

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
