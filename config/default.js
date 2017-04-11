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
