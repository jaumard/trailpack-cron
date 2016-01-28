'use strict'

const Annotation = require('ecmas-annotations').Annotation
const _ = require('lodash')

/**
 *
 * @type {*}
 */
module.exports = class Cron extends Annotation {

  /**
   * The possible targets
   *
   * (Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets() {
    return [Annotation.METHOD]
  }

  /**
   * The function to call when annotations are find
   *
   * @type {Function}
   */
  handler(app, annotation) {

    if (!annotation.className) {
      annotation.className = _.last(annotation.filePath.split('/')).replace('.js', '')
    }
    const cron = app.config.cron

    const defaults = {
      schedule: annotation.value,
      onTick: function (app) {
        const service = app.services[annotation.className]
        if (service) {
          service[annotation.target]()
        }
      },
      start: true, // Start task immediately
      timezone: app.config.cron.defaultTimeZone
    }

    if (_.isObject(annotation.value)) {
      //app.services.CronService.addJob(annotation.className+annotation.target, _.extends(defaults, annotation.value))
      cron.jobs[annotation.className + annotation.target] = _.extend(defaults, annotation.value)
    }
    else {
      //app.services.CronService.addJob(annotation.className+annotation.target, defaults)
      cron.jobs[annotation.className + annotation.target] = defaults
    }
  }

  /**
   * File path
   *
   * @type {String}
   */
  static get path() {
    return __filename
  }
}
