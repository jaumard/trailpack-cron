const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'cron-trailpack-test',
    version: '1.0.0'
  },
  config: {
    cron: {
      myJob: {
        schedule: '* * * * * *',
        onTick: function (app) {
          app.log.info('I am triggering every second');
        },
        context: 'test'
      }
    },
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('../') // trailpack-cron
      ]
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
