const connection = require('../lib/db')
const human = require('humanparser')
const md5 = require('crypto-js/md5')
const Model = require('simple-sql-model')

class User extends Model {

  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  toString() { return this.name }
  get firstName() { return human.parseName(this.name).firstName }
  get lastName() { return human.parseName(this.name).lastName }
  get gravatarHash() { return md5(this.email) }
  get url() { return `/users/${this.id}` }

  avatarUrl(size = 20) {
    return `https://www.gravatar.com/avatar/${this.gravatarHash}?s=${size}`
  }


  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() { return '/users' }
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
    'bio',

    // Type
    'staff',

    // Dates
    'createdAt',
    'updatedAt',
  ]
})

module.exports = User
