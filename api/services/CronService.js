'use strict'

const Service = require('trails-service')
const CronJob = require('cron').CronJob

/**
 * @module CronService
 * @description Manage cron tasks
 */
module.exports = class CronService extends Service {

  init() {
    const config = this.app.config.cron
    const jobs = Object.keys(config.jobs)
    this.jobs = {}

    jobs.forEach(job => {
      this.addJob(job, config.jobs[job])
    })
  }

  addJob(name, job) {
    if (this.jobs[name]) {
      this.jobs[name].stop()
    }
    this.jobs[name] = new CronJob(
      job.schedule,
      () => {
        if (job.onTick) {
          job.onTick(this.app)
        }
      },
      () => {
        if (job.onComplete) {
          job.onComplete(this.app)
        }
      },
      typeof job.start === 'boolean' ? job.start : true,
      job.timezone || this.app.config.cron.defaultTimeZone,
      job.context
    )
  }
}

