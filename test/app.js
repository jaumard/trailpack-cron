'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'cron-trailpack-test',
    version: '1.0.0'
  },
  config: {
    api: {
      services: {
        DefaultService: require('./api/services/DefaultService')
      }
    },
    annotations: {
      pathToScan: __dirname + '/api'
    },
    cron: {
      defaultTimeZone: 'Europe/Paris', // Default timezone use for tasks
      jobs: {
        myJob: {
          schedule: '* * * * * *',
          onTick: app => {
            app.log.info('I am triggering every second')
          }
        }
      }
    },
    main: {
      packs: [
        require('trailpack-annotations'),
        require('../') // trailpack-cron
      ]
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
