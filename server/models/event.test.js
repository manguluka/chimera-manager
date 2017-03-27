const Event = require('./event')

describe('server/lib/event', () => {

  context('instance methods', () => {

    it('has convenience methods', () => {
      console.log(new Event())
      const event = new Event({
        cancelledAt: new Date('Jan 1 2010'),
        startsAt: new Date('2020-10-20 12:00:00 PDT'),
        endsAt: new Date('2020-10-20 16:00:00 PDT'),
      })
      expect(event.cancelled).to.be.true
      expect(event.endDay).to.equal('2020-10-20')
      expect(event.endTime).to.equal('16:00')
      expect(event.startDay).to.equal('2020-10-20')
      expect(event.startTime).to.equal('12:00')
    })
  })

})
