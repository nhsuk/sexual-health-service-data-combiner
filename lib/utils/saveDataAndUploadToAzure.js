const moment = require('moment');

const azureService = require('./azureService');
const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

function getDateYYYYMMDD(date) {
  return moment(date).format('YYYYMMDD');
}

function getTimeStampedFilename(filename) {
  return filename.replace('.json', `-${getDateYYYYMMDD(new Date())}.json`);
}

async function saveDataAndUploadToAzure(data) {
  const filename = config.mergedDataFilename();
  const dataFilename = `${config.dataDir.latest}/${filename}`;
  fileHelper.saveJson(data, dataFilename);

  log.info(`Overwriting '${filename}' in Azure`);
  await azureService.uploadToAzure(config.blobContainerName, dataFilename, filename);

  const timeStampedFilename = getTimeStampedFilename(filename);
  log.info(`Saving date stamped version '${timeStampedFilename}' in Azure`);
  return azureService.uploadToAzure(config.blobContainerName, dataFilename, timeStampedFilename);
}

module.exports = saveDataAndUploadToAzure;
