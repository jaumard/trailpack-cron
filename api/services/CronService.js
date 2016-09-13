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
    let cronJob = false
    if(this.app.config.caches && this.app.config.caches.stores){
      this.clusterServer = _.find(this.app.config.caches.stores, {
        type: 'redis'
      })
    }
    if(this.clusterServer){
      const redis = require('redis').createClient(cacheConfig)
      cronJob = require('cron-cluster')(redis).CronJob
    }
    else {
      cronJob = require('cron').CronJob
    }

    const config = this.app.config.cron
    const jobs = Object.keys(config.jobs)
    this.jobs = {}

    jobs.forEach(job => {
      this.addJob(job, config.jobs[job], cronJob)
    })
  }

  addJob(name, job, service) {
    if (this.jobs[name]) {
      this.jobs[name].stop()
    }
    this.jobs[name] = new service(
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

