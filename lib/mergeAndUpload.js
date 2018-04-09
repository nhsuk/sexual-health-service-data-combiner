const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadFile = require('./utils/downloadFile');
const merge = require('./utils/merge');
const saveDataAndUploadToAzure = require('./utils/saveDataAndUploadToAzure');

async function mergeAndUpload() {
  const shisData = await downloadFile(config.data.sources.shis);
  const csu25Data = await downloadFile(config.data.sources.csu25);
  const csatNhsData = await downloadFile(config.data.sources.csatNhs);
  const csatNonNhsData = await downloadFile(config.data.sources.csatNonNhs);

  const mergedData = merge([shisData, csu25Data, csatNhsData, csatNonNhsData]);

  await saveDataAndUploadToAzure(mergedData);
}

module.exports = mergeAndUpload;
