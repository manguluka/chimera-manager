const config = require('config')
const logger = require('./logger')
const moment = require('moment')

const API_KEY = config.get('meetup.apiKey')
const GROUP_ID = config.get('meetup.groupId')
const URL_NAME = config.get('meetup.urlName')

const meetup = require('meetup-api')({ key: API_KEY })

function eventToMeetup(event) {
  const parameters = {
    name: event.title,
    description: '<strong>This is a description</strong>',
    duration: moment.duration(event.endsAt - event.startsAt).asMilliseconds(),
    group_id: GROUP_ID,
    group_urlname: URL_NAME,
    guest_limit: event.attendeeMax,
    publish_status: 'published',
    announce: true,
    time: moment(event.date).valueOf(),
  }

  if (event.meetupId) parameters.id = event.meetupId

  return parameters
}

async function create(event) {
  logger.log('info', '[meetup.create] Creating meetup:', event)

  const parameters = eventToMeetup(event)

  logger.log('debug', '[meetup.create] Meetup request params:', parameters)

  meetup.postEvent(parameters, (error, resp) => {
    if (error) {
      logger.log('error', '[meetup.create] Error creating event on Meetup:', {
        error,
        status: error.status,
        message: error.message,
        parameters,
      })
      return
    }

    logger.log('info', '[meetup.create] Meetup response:', resp)
  })
}

/**
 * @see https://www.meetup.com/meetup_api/docs/1/event/#edit
 */
async function update(event) {
  logger.log('info', '[meetup.update] Updating meetup:', event)

  const parameters = eventToMeetup(event)

  logger.log('debug', '[meetup.update] Meetup request params:', parameters)

  meetup.editEvent(parameters, (error, resp) => {
    if (error) {
      logger.log('error', '[meetup.update] Error updating on Meetup:', {
        error,
        status: error.status,
        message: error.message,
        parameters,
      })
      return
    }

    logger.log('info', '[meetup.update] Meetup response:', resp)
  })
}

module.exports = { create, update }
