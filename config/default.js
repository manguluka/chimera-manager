module.exports = {
  appName: 'Chimera',
  timezone: 'PDT',
  db: {
    name: 'chimera',
    host: 'localhost',
    password: null,
    port: 5432,
    user: 'dana',
  },
  payments: {
    stripePublicKey: 'pk_rci4rrUMIrHkdAOY0roPYIRsRbAVj',
    stripePrivateKey: 'XXrG3naVp36XyGzdYycZasxc2S1Rk9go',
  },
  meetup: {
    apiKey: '743c5d705f396c413f371c567e226f57',
    groupId: 1258123610000, //8432752,
    venueId: 14737322,
    urlName: 'Meetup-API-Testing', //'Chimera-Arts-Maker-Space'
  },
  env: 'development',
  host: 'localhost',
  logging: {
    level: 'debug',
    logDnaKey: 'no-key',
  },
  port: 3333,
  emails: {
    defaultFromAddress: 'info@chimeraarts.org',
  },
  sessionSecret: 'supesekret',
}
