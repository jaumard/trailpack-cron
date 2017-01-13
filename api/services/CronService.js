'use strict'

const Service = require('trails/service')

/**
 * @module CronService
 * @description Manage cron tasks
 */
module.exports = class CronService extends Service {

  init() {
    let cronJobService = false
    const config = this.app.config.cron

    /* Detect if Redis Exist */
    if (config.cluster){
      const redis = require('redis').createClient(config.cluster)
      cronJobService = require('cron-cluster')(redis).CronJob
    }
    else {
      cronJobService = require('cron').CronJob
    }

    const jobs = Object.keys(config.jobs)
    this.jobs = {}
    jobs.forEach(job => {
      this.addJob(job, config.jobs[job], cronJobService)
    })
  }

  addJob(name, job, CronJobService) {
    if (this.jobs[name]) {
      this.jobs[name].stop()
    }
    this.jobs[name] = new CronJobService(
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

