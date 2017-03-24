'use strict'

const path = require('path')

let webpackConfig = require('./webpack.config')
webpackConfig = Object.assign({}, webpackConfig, {
  // See: http://airbnb.io/enzyme/docs/guides/karma.html
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  node: {
    fs: 'empty',
  },
})
webpackConfig.entry = {}

module.exports = (config) => {
  config.set({
    basePath: '',
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
      },
    },
    frameworks: [
      'mocha',
      'phantomjs-shim',
      'chai',
      'chai-sinon',
    ],
    exclude: [
      'app',
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'node_modules/core-js/client/shim.min.js',
      'frontend/**/*.test.js',
    ],
    preprocessors: {
      'frontend/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackServer: {
      quiet: true,
      stats: {
        colors: true,
      },
    },
    exclude: [],
    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatchBatchDelay: 300,
    browsers: [
      //'Chrome',
      'PhantomJS',
    ],
    reporters: [
      'coverage',
      'mocha',
      //'dots',
    ],
    mochaReporter: {
      output: 'minimal',
    },
    captureTimeout: 60000,
    singleRun: true,
  })
}
