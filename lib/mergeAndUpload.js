const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadFile = require('./utils/downloadFile');
const enrich = require('./utils/enrich');
const merge = require('./utils/merge');
const log = require('./utils/logger');
const saveDataAndUploadToAzure = require('./utils/saveDataAndUploadToAzure');

async function downloadFileAndEnrich(toEnrich, enrichmentData) {
  const downloadedData = await downloadFile(toEnrich);
  return enrich(downloadedData, enrichmentData, toEnrich.description);
}

async function mergeAndUpload() {
  const shisData = await downloadFile(config.data.sources.shis);
  const csu25Data = await downloadFile(config.data.sources.csu25);

  const pharmacyData = await downloadFile(config.data.sources.pharmacy);

  const csatNhsData = await downloadFileAndEnrich(config.data.sources.csatNhs, pharmacyData);
  const csatNonNhsData = await downloadFileAndEnrich(config.data.sources.csatNonNhs, pharmacyData);

  const mergedData = merge([shisData, csu25Data, csatNhsData, csatNonNhsData]);

  const reportObj = {};
  reportObj[`${config.data.sources.csatNhs.description} Object Count`] = csatNhsData.length;
  reportObj[`${config.data.sources.csatNonNhs.description} Object Count`] = csatNonNhsData.length;
  reportObj[`${config.data.sources.csu25.description} Object Count`] = csu25Data.length;
  reportObj[`${config.data.sources.pharmacy.description} Object Count`] = pharmacyData.length;
  reportObj[`${config.data.sources.shis.description} Object Count`] = shisData.length;
  reportObj['Merged data Object Count'] = mergedData.length;

  await saveDataAndUploadToAzure(mergedData);
  log.info(reportObj, 'Merging dataset processing report');
}

module.exports = mergeAndUpload;
