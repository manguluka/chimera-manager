const _ = require('lodash')
const dayTimeToDatetime = require('../../lib/day-time-to-datetime')
const camelizeObject = require('../../lib/camelize-object')
const decamelizeObject = require('../../lib/decamelize-object')
const db = require('../lib/db')
const dollarsToCents = require('../../lib/dollars-to-cents')
const marked = require('marked')
const moment = require('moment')
const sql = require('sql')

//const Event = {}

sql.setDialect('postgres')

const event = sql.define({
  name: 'events',
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

class Event {


  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  constructor(fields) {
    //super(fields)
    const attrs = Event.toModelFromDb(fields)
    Object.assign(this, attrs)
    //this = { ...this, ...attrs }
  }

  toString() { return this.title }

  get descriptionHtml() { return marked(this.description) }

  get startDay() { return moment(this.startsAt).format('YYYY-MM-DD') }
  get startTime() { return moment(this.startsAt).format('HH:mm') }
  get endDay() { return moment(this.endsAt).format('YYYY-MM-DD') }
  get endTime() { return moment(this.endsAt).format('HH:mm') }

  get visibility() {
    return this.internal ? 'internal (members only)' : 'public'
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
    range += ' from '
    range += moment(this.startsAt).format('h:mma')
    range += '-'
    range +=  moment(this.endsAt).format('h:mma')
    return range
  }

  get cancelled() { return Boolean(this.cancelledAt) }

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

  static async create(fields) {
    const values = Event.toDbFromModel(fields)
    const query = event
      .insert(values)
      .returning().toQuery()
    const result = await db.query(query)
    return new Event(result[0])
  }

  static async findOne(id) {
    const query = event
      .select(event.star())
      .where(event.id.equals(id))
      .limit(1)
      .toQuery()
    const result = await db.query(query)
    return new Event(result[0])
  }

  static async findMany(search) {
    let query = event.select(event.star())

    // If no query, return everything
    if (!_.isEmpty(search)) {
      let filters = []
      if (search.draft !== undefined) filters.push(event.draft.equals(search.draft))
      if (search.internal !== undefined) filters.push(event.internal.equals(search.internal))
      query = query.where(filters)
    }

    const result = await db.query(query.order(event.starts_at).toQuery())
    const events = result.map((e) => new Event(e))

    return events
  }

  static async update(id, fields) {
    const changes = Event.toDbFromModel(fields)
    const query = event
      .update(changes)
      .where(event.id.equals(id))
      .returning().toQuery()
    const result = await db.query(query)
    return new Event(result[0])
  }

  static get categories() {
    return [ 'event', 'class', 'training', 'meetup' ]
  }

  static toDbFromModel(model) { return decamelizeObject(model) }

  static toModelFromDb(fields) { return camelizeObject(fields) }

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

module.exports = Event
