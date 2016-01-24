/**
 * Cron Configuration
 * (app.config.cron)
 *
 * Configure cron tasks
 *
 * @see {@link https://github.com/jaumard/trailpack-cron}
 */
module.exports = {
  myJob: {
    schedule: '* * * * * *',
    onTick: function (app) {
      app.log.info('I am ticking');
    },
    onComplete: function (app) {
      app.log.info('I am done');
    },
    start: true, // Start task immediately
    timezone: 'France/Paris' // Custom timezone
  }
}
