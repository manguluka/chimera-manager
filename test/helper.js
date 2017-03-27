const chalk = require('chalk')
const chai = require('chai')
const Promise = require('bluebird')
//import { mockReq, mockRes } from 'sinon-express-mock'

//chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

//global.clearDb = require('mocha-mongoose')(MONGO_TEST_URI)
global.expect = chai.expect
//global.fetch = require('isomorphic-fetch').default
//global.mockReq = mockReq
//global.mockRes = mockRes
global.sinon = require('sinon')

// Allows Bluebird to catch unhandled exceptions.
Promise.onPossiblyUnhandledRejection((err) => {
  throw err
})
