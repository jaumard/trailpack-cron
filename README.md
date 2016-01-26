# trailpack-cron
[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

:package: Add Trails service for running cron tasks

## Intallation
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-cron
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-cron`

## Configuration
Static jobs can be added on config/cronjs` :
```js
// config/cron.js
module.exports = {
  myJob: {
    schedule: '* * * * * *',
    onTick: function (app) {
      app.log.info('I am ticking every second');
    },
    onComplete: function (app) {
      app.log.info('I am done');
    },
    start: true, // Start task immediately
    timezone: 'France/Paris' // Custom timezone
  }
}
```

## Usage
Now you can send start/stop jobs like this : 

```
this.app.services.CronService.jobs.myJob.start()
this.app.services.CronService.jobs.myJob.stop()
```

```
this.app.services.CronService.addJob('mySecondJob', {
    schedule: '*/5 * * * * *',
    onTick: function (app) {
      app.log.info('I am ticking every 5 seconds');
    },
    onComplete: function (app) {
      app.log.info('I am done');
    },
    start: true, // Start task immediately
    timezone: 'France/Paris' // Custom timezone
  })
```

## License
[MIT](https://github.com/jaumard/trailpack-cron/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-cron.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-cron
[ci-image]: https://travis-ci.org/jaumard/trailpack-cron.svg?branch=master
[ci-url]: https://travis-ci.org/jaumard/trailpack-cron
[daviddm-image]: http://img.shields.io/david/jaumard/trailpack-cron.svg?style=flat-square
[daviddm-url]: https://david-dm.org/jaumard/trailpack-cron
[codeclimate-image]: https://img.shields.io/codeclimate/github/jaumard/trailpack-cron.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jaumard/trailpack-cron
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails
