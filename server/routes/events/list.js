const moment = require('moment')
const Event = require('../../models/event')
const wrap = require('express-async-wrapper')
const calendarDates = require('monthly-calendar-date-helper')

module.exports = wrap(async (req, res, next) => {
  // TODO: find by date, hide drafts, hide public, etc...

  // Get current month
  const selectedDay = moment(req.query.month) || moment()
  const month = selectedDay.format('MM')
  const year = selectedDay.format('YYYY')
  const monthDisplay = `${year}-${month}`
  const weeks = calendarDates(month, year, { split: true })
  const firstDay = moment([year, Number(month) - 1])
  const lastDay = selectedDay.endOf('month')

  const query = {
    where: {
      startsAt: { gte: firstDay, lte: lastDay },
    },
    order: {
      startsAt: 'asc',
    },
  }

  if (req.currentUser) {
    if (!req.currentUser.staff) {
      query.where.draft = { equals: false }
    }
  } else {
    query.where.draft = { equals: false }
    query.where.internal = { equals: false }
  }
  console.log(query)

  const events = await Event.findMany(query)
  const eventsByDay = weeks.map(week => {
    return week.map(day => {
      return {
        [day]: events.filter(event => {
          return (
            moment(event.startsAt).format('YYYY-MM-DD') ===
            moment(day).format('YYYY-MM-DD')
          )
        }),
      }
    })
  })
  res.render('events/list', { events, eventsByDay, month, monthDisplay, year })
})
