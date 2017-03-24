const bodyParser = require('body-parser')
const chalk = require('chalk')
const config = require('config')
const templateLocalsMiddleware = require('./middleware/template-locals')
const currentUserMiddleware = require('./middleware/current-user')
const errorHandler = require('./middleware/error-handler')
const express = require('express')
const logger = require('./lib/logger')
const notFound = require('./middleware/not-found')
const session = require('express-session')

const APP_NAME = config.get('appName')
const ENV = config.get('env')
const PORT = config.get('port')
const SESSION_SECRET = config.get('sessionSecret')

const app = express()

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use(express.static('public'))
app.use(session({
  secret: SESSION_SECRET,
  cookie: {
    //httpOnly: true,
    //secure: true,
    maxAge: (365 * 24 * 60 * 60 * 1000),
  },
  //store,
  saveUninitialized: false,
  resave: false,
}))
app.use(currentUserMiddleware())
app.use(templateLocalsMiddleware())
//app.use(session({
  //secret: config.get('sessionSecret'),
  //resave: false,
  //saveUninitialized: true,
  ////cookie: { secure: true }
//}))

// Routes
// TODO: add basic auth
app.use('/events', require('./routes/events'))
app.use('/auth', require('./routes/auth'))
app.get('/', (req, res) => res.redirect('/events'))

// Catch any missing routes...
app.use(notFound())
app.use(errorHandler())

// Serve app
app.listen(PORT)

logger.log(
  'info',
  '🌎 ',
  chalk.blue(APP_NAME),
  chalk.green('starting'),
  chalk.blue(ENV),
  chalk.green('server on port'),
  chalk.blue(PORT)
)