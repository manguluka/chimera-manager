import 'babel-polyfill'
import chalk from 'chalk'
import chai from 'chai'
import Promise from 'bluebird'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

global._ = require('lodash')
global.clearDb = require('mocha-mongoose')(MONGO_TEST_URI)
global.expect = chai.expect
global.fetch = require('isomorphic-fetch').default
//global.fixtures = require('./fixtures').default
global.mockReq = mockReq
global.mockRes = mockRes
global.sinon = require('sinon')

// Allows Bluebird to catch unhandled exceptions.
Promise.onPossiblyUnhandledRejection((err) => {
  throw err
})

// Make a global function:
//global.doStuff = () => {
  //console.log('Doing stuff...')
//}
