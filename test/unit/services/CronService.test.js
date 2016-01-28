'use strict'
/* global describe, it */
const assert = require('assert')

describe('CronService', () => {
  it('should exist', () => {
    assert(global.app.api.services['CronService'])
    assert(global.app.services['CronService'])
  })
  it('should have one job', () => {
    assert(global.app.services['CronService'].jobs)
    assert(global.app.services['CronService'].jobs.myJob)
    //assert(global.app.services['CronService'].jobs.DefaultServicetest)
  })
})
