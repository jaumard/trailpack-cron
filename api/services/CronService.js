'use strict'

const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module CronService
 * @description Manage cron tasks
 */
module.exports = class CronService extends Service {

  init() {
    /* Detect if Redis Exist */
    this.clusterServer = false
    let cronJobService = false
    if (this.app.config.caches && this.app.config.caches.stores){
      this.clusterServer = _.find(this.app.config.caches.stores, {
        type: 'redis'
      })
    }
    if (this.clusterServer){
      const redis = require('redis').createClient(this.clusterServer)
      cronJobService = require('cron-cluster')(redis).CronJob
    }
    else {
      cronJobService = require('cron').CronJob
    }

    const config = this.app.config.cron
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

