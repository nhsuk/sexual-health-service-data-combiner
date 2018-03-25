const moment = require('moment');

const azureService = require('./azureService');
const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

function getDateYYYYMMDD(date) {
  return moment(date).format('YYYYMMDD');
}

function getTimeStampedName() {
  return config.mergedDataFile().replace('.json', `-${getDateYYYYMMDD(new Date())}.json`);
}

async function saveDataAndUploadToAzure(data) {
  const file = config.mergedDataFile();
  const dataFile = `${config.dataDir.latest}/${file}`;
  fileHelper.saveJson(data, dataFile);

  log.info(`Overwriting '${file}' in Azure`);
  await azureService.uploadToAzure(config.blobContainerName, dataFile, file);

  const timeStampedName = getTimeStampedName();
  log.info(`Saving date stamped version '${timeStampedName}' in Azure`);
  return azureService.uploadToAzure(config.blobContainerName, dataFile, timeStampedName);
}

module.exports = saveDataAndUploadToAzure;
