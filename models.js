// All models have:
const Model = {}
Model.create(fields)
Model.findOne(id)
Model.findMany({ field: 'value' }) // if no query, return all
Model.update(id, updatedFields)
Model.destroy(id)

const Event = {
  title: 'Some Event',
  description: 'Gonna be fun!',
  startTime: new Date('March 23 2017 6:00pm'),
  endTime: new Date('March 23 2017 6:00pm'),
  cost: 3500, // in cents,
  materialFee: 0, // in cents
  instructors: [ 2, 27 ],
  photoUrl: '...',
  internal: true,
  draft: true,
  meetupUrl: '...',
  type: 'meetup', // from: event, class, training, meetup
  //cancellationPeriod
  createdAt: new Date(),
  updatedAt: new Date(),
}
Event.cancel(id) //=> Mark as "cancelled", don't destroy
Event.addAttendee(attendeeId)
Event.removeAttendee({ refund: false })
Event.activities(id)

const Attendance = {
  event: 8,
  user: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}


const User = {
  name: 'John Smith',
  bio: 'Foo Bar',
  email: 'john@google.com',
  member: false,
  staff: false,
  stripeCustomerId: 'asdf',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const Activity = {
  date: new Date('Jan 1 2017 6:45pm'), // index
  message: 'created "Foo" meetup',
  user: 1, // index
  model: 'Event', // index, optional
  modelId: 5, // index, eg event.id === 5
  createdAt: new Date(),
  updatedAt: new Date(),
}
Activity.forEvent(eventId)
Activity.formatMessage(id) //=> John Smith created "Foo" meetup on 3/12/17 at 3:45pm
