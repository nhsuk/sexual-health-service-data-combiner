const azureService = require('./azureService');
const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

async function saveDataAndUploadToAzure(data) {
  const filename = config.data.mergedDataFilename();
  const dataFilename = `${config.data.dir.latest}/${filename}`;
  fileHelper.saveJson(data, dataFilename);

  log.info(`Overwriting '${filename}' in Azure`);
  await azureService.uploadToAzure(config.blobContainerName, dataFilename, filename);

  const timeStampedFilename = fileHelper.getTimeStampedFilename(filename);
  log.info(`Saving date stamped version '${timeStampedFilename}' in Azure`);
  return azureService.uploadToAzure(config.blobContainerName, dataFilename, timeStampedFilename);
}

module.exports = saveDataAndUploadToAzure;
