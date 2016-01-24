# trailpack-cron
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
