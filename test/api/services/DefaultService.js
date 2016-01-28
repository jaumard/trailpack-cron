'use strict'

module.exports = class DefaultService{
  /**
   * @Cron("* * * * * *")
   */
  test(){
    this.app.log.info('I am triggering every second from annotation!');
  }

  /**
   * @Cron({
   *  schedule: '* * * * * *'
   * })
   */
  testObj(){
    this.app.log.info('I am triggering every second from annotation!');
  }
}
