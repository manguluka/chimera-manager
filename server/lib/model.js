const _ = require('lodash')
const camelizeObject = require('../../lib/camelize-object.js')
const decamelizeObject = require('../../lib/decamelize-object')
const db = require('./db')
const sql = require('sql')

module.exports = class Model {


  //---------------------------------------------
  // Class methods
  //---------------------------------------------

  static configureSchema(schema) {
    // TODO: instead take a custom schema definition which
    // handles validation?
    if (!this.schema) {
      this.schema = sql.define(schema)
    }
  }

  static async create(fields) {
    const values = this.toDbFromModel(fields)
    const query = this.schema
      .insert(values)
      .returning().toQuery()
    const result = await db.query(query)
    return new this(result[0])
  }

  static async findOne(idOrQuery) {
    let query = this._constructQuery(idOrQuery)

    query.limit(1)
    const result = await db.query(query.toQuery())
    return new this(result[0])
  }

  static async findMany(search) {
    const query = this._constructQuery(search)
    const result = await db.query(query.toQuery())
    return result.map((e) => new this(e))
  }

  static async update(idOrQuery, fields) {
    const changes = this.toDbFromModel(fields)
    const start = this.schema.update(changes)
    const query = this._constructQuery(idOrQuery, start)
    query.returning()

    const result = await db.query(query.toQuery())
    return new this(result[0])
  }

  static async destroyAll({ yesImReallySure }) {
    if (yesImReallySure) {
      const query = this.schema.delete().toQuery()
      await db.query(query)
    }
  }

  static _constructQuery(search, startingQuery) {

    // Convert a string version of the ID to a number
    // in case the consumer forgot to do the conversion themselves.
    if (typeof search === 'string') {
      search = Number(search)
    }

    // Searching by ID
    if (typeof search === 'number') {
      search = {
        where: { id: { equals: search } },
      }
    }

    const query = startingQuery ? startingQuery : this.schema.select(this.schema.star())

    // Filter results
    // See here for all possible values:
    // https://github.com/brianc/node-sql/blob/5ec7827cf637a4fe6b930fd4e8d27e6a8cb5289f/test/binary-clause-tests.js#L11
    if (search && search.where) {
      _.map(search.where, (filters, field) => {
        _.map(filters, (value, filter) => {
          query.where(this.schema[field][filter](value))
        })
      })
    }

    // Sort results
    if (search && search.order) {
      _.map(search.order, (sort, field) => {
        // TODO: Support "and/or" type queries
        query.order(this.schema[field][sort])
      })
    }

    // Limit amount of returned results.
    if (search && search.limit) {
      query.limit(search.limit)
    }

    return query
  }

  static toDbFromModel(model) { return decamelizeObject(model) }

  static toModelFromDb(fields) { return camelizeObject(fields) }

  static toString() {
    return this.name
  }


  //---------------------------------------------
  // Instance methods
  //---------------------------------------------

  constructor(fields) {
    const attrs = this.constructor.toModelFromDb(fields)
    Object.assign(this, attrs)
  }

  toString() {
    return this.constructor.name
  }

}
