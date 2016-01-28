'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')


module.exports = class CronTrailpack extends Trailpack {

  /**
   * Wait Trails ready event to launch jobs
   */
  initialize() {
    this.app.on('trails:ready', () => {
      this.app.services.CronService.init()
    })
    return Promise.resolve()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

