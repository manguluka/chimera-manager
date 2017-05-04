const connection = require('../lib/db')
const human = require('humanparser')
const md5 = require('crypto-js/md5')
const Model = require('simple-sql-model')
const stripe = require('../lib/stripe')

class User extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  toString() {
    return this.name
  }
  get firstName() {
    return human.parseName(this.name).firstName
  }
  get lastName() {
    return human.parseName(this.name).lastName
  }
  get gravatarHash() {
    return md5(this.email)
  }
  get url() {
    return `/users/${this.id}`
  }

  // TODO: check if they have a membership associated with their account
  get member() {
    return true
  }

  avatarUrl(size = 20) {
    return `https://www.gravatar.com/avatar/${this.gravatarHash}?s=${size}`
  }

  async cards() {
    if (!this.stripeCustomerId) return []
    // TODO: go to stripe and get all cards for customer
    const customer = await stripe.customers.retrieve(this.stripeCustomerId)
    console.log('CUSTOMER', customer)
    return customer.sources.data
  }

  async charges() {
    return await require('./charge').findMany({
      where: { userId: this.id },
      order: { createdAt: 'desc' },
    })
  }

  async activities() {
    return await require('./activity').findMany({
      where: { userId: { equals: this.id } },
      order: { createdAt: 'desc' },
    })
  }

  async signoffs() {
    return await require('./signoff').findMany({
      where: { userId: { equals: this.id } },
      order: { createdAt: 'desc' },
    })
  }

  async accessCards() {
    return await require('./access-card').findMany({
      where: { userId: { equals: this.id } },
      order: { createdAt: 'desc' },
    })
  }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() {
    return '/users'
  }
}

User.configure({
  connection,
  // TODO:
  //validations: {
  //email: {
  //lower: true,
  //trim: true,
  //},
  //},
  table: 'users',
  columns: [
    'id',

    // Basic details
    'name',
    'email',
    'phone',
    'bio',

    // Payment info
    'stripeCustomerId',

    // Type
    'staff',

    // Dates
    'createdAt',
    'updatedAt',
  ],
})

module.exports = User
