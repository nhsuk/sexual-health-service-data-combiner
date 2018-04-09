const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadFile = require('./utils/downloadFile');
const enrich = require('./utils/enrich');
const merge = require('./utils/merge');
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

  await saveDataAndUploadToAzure(mergedData);
}

module.exports = mergeAndUpload;
