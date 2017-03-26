const Model = require('./model')
const sql = require('sql')

class Event extends Model {

}

Event.configureSchema({
  name: 'events',
  columns: [
    'id',
    'title',
  ]
})

describe('server/lib/model', () => {

  beforeEach(async () => {
    await Event.destroyAll({
      yesImReallySure: true,
    })
  })

  context('initialization', () => {

    it('should return inherited class name when stringifying', () => {
      expect(Event.toString()).to.equal('Event')
      expect(String(Event)).to.equal('Event')
    })

  })

  context('static methods', () => {

    context('.create()', () => {

      it('should return an instance of the created model', async () => {
        const event = await Event.create({ title: 'Some Event' })
        expect(event).to.be.instanceOf(Event)
        expect(event.id).to.a.number
        expect(event.title).to.equal('Some Event')
      })

    })

    context('.findOne()', () => {

      it('should find by ID if a number is passed in', async () => {
        const event = await Event.create({ title: 'Test1' })
        const found = await Event.findOne(event.id)
        expect(found).to.deep.equal(event)
      })

      xit('should find by query if a query is passed in', () => {

      })

    })

    context('.findMany()', () => {

      it('should return an array of matched results', async () => {
        const e1 = await Event.create({ title: 'Event 1' })
        const e2 = await Event.create({ title: 'Event 2' })
        const result = await Event.findMany()
        expect([ e1, e2 ]).to.deep.equal(result)
      })

      it('should allow ordering', async () => {
        const e1 = await Event.create({ title: 'A' })
        const e2 = await Event.create({ title: 'Z' })
        const result = await Event.findMany({
          order: {
            title: 'desc',
          },
        })
        expect(result[0]).to.deep.equal(e2)
        expect(result[1]).to.deep.equal(e1)
      })

      it('should allow filtering results', async () => {
        const e1 = await Event.create({ title: 'A' })
        const e2 = await Event.create({ title: 'Z' })
        const result = await Event.findMany({
          where: {
            title: { equals: 'Z' },
          },
        })
        expect(result).to.have.length(1)
        expect(e2).to.deep.equal(result[0])
      })

      it('should allow chaining queries', async () => {
        const e1 = await Event.create({ title: 'Laser Training' })
        const e2 = await Event.create({ title: 'Laser Class' })
        const e3 = await Event.create({ title: 'Jewelry Training' })
        const result = await Event.findMany({
          where: { title: { like: 'Laser%' } }, // starts with...
          order: { title: 'asc' },
        })
        expect(result).to.have.length(2)
        expect(e2).to.deep.equal(result[0])
        expect(e1).to.deep.equal(result[1])
      })

      it('should allow limiting results', async () => {
        const e = await Event.create({ title: 'Laser Training' })
        await Event.create({ title: 'Laser Class' })
        await Event.create({ title: 'Jewelry Training' })
        const result = await Event.findMany({
          limit: 1,
        })
        expect(result).to.have.length(1)
        expect(result[0]).to.deep.equal(e)
      })

      xit('should allow custom queries', () => {
        //await Event.findMany({
          //query(schema) {
            //return schema.select(schema.name).where(schema.id.in(Post.schema.select(Post.schema.userId)))
          //}
        //})
      })

    })

    context('.update()', () => {

      it('should update the given model row in the DB', async () => {
        const e = await Event.create({ title: 'Laser Training' })
        const updated = await Event.update(e.id, { title: 'Updated' })
        expect(updated.title).to.equal('Updated')
      })

    })

  })

  context('instance methods', () => {

    it('should stringify name of model by default', () => {
      expect(String(new Event())).to.equal('Event')
    })
  })

})
