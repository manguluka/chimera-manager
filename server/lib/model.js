module.exports = class Model {

  static async where(search) {
    let query

    // If no query, return everything
    if (_.isEmpty(search)) {
      query = event.select(event.star()).toQuery()
    } else {
      //query = event.select
    }

    const result = await db.query(query)
    const events = result.map((e) => new Event(e))

    return events
  }

}
