const schedule = require('node-schedule');
const VError = require('verror');

const log = require('./lib/utils/logger');
const mergeAndUpload = require('./lib/mergeAndUpload');
const scheduleConfig = require('./config/scheduleConfig');

(async function combine() {
  try {
    if (!scheduleConfig.schedulerDisabled()) {
      // run on initial start, then on the schedule
      await mergeAndUpload();
    }

    log.info(`Scheduling sexual health service data merge with rule '${scheduleConfig.getSchedule()}'`);
    schedule.scheduleJob(scheduleConfig.getSchedule(), async () => {
      await mergeAndUpload();
    });
  } catch (ex) {
    log.error({ error: new VError(ex, 'Error performing merge and upload') });
  }
}());
