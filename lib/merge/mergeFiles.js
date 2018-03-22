const fs = require('fs');
const prettyHrtime = require('pretty-hrtime');
const log = require('../utils/logger');
const onlineServices = require('./onlineServices');
const fileHelper = require('../utils/fileHelper');
const addSearchFields = require('./addSearchFields');
const config = require('../../config/config');

const bookingSystems = require('../../input/booking.json');
const scriptSystems = require('../../input/scripts.json');
const recordsSystems = require('../../input/records.json');

function saveFileSync(mergedData) {
  const outputDir = config.outputDir;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  fs.writeFileSync(`${outputDir}/${config.combinedDataFile}`, JSON.stringify(mergedData), 'utf8');
}

function mergeFiles() {
  const startTime = process.hrtime();
  // TODO: The data files for SHSD aren't being merged into a 'master' object
  // The GSD files need concatinating and the pharmacy services needs enriching
  // with the pharmacy data before concatinating
  const gps = fileHelper.loadJson(`${config.inputDir}/${config.GP_DATA_FILE}`);
  const merged = gps.map((gp) => {
    /* eslint-disable no-param-reassign */
    gp.onlineServices = {};
    addSearchFields(gp);
    onlineServices.add({ gp, key: 'appointments', systemList: bookingSystems });
    onlineServices.add({ gp, key: 'repeatPrescriptions', systemList: scriptSystems });
    onlineServices.add({ gp, key: 'codedRecords', systemList: recordsSystems });
    /* eslint-enable no-param-reassign */

    return gp;
  });

  saveFileSync(merged);
  const endTime = process.hrtime(startTime);
  log.info(`Merging GP data sets took: ${prettyHrtime(endTime)}`);
}

module.exports = mergeFiles;
