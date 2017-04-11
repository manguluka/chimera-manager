module.exports = {
  appName: 'APP_NAME',
  timezone: 'TIMEZONE',
  db: {
    name: 'DB_NAME',
    host: 'DB_HOST',
    password: 'DB_PASSWORD',
    port: 'DB_PORT',
    user: 'DB_USER',
  },
  payments: {
    stripePublicKey: 'STRIPE_PUBLIC_KEY',
    stripePrivateKey: 'STRIPE_PRIVATE_KEY',
  },
  env: 'NODE_ENV',
  host: 'HOST',
  logging: {
    level: 'LOG_LEVEL',
    logDnaKey: 'LOG_DNA_KEY',
  },
  port: 'PORT',
  emails: {
    defaultFromAddress: 'DEFAULT_FROM_ADDRESS',
  },
  sessionSecret: 'SESSION_SECRET',
}
