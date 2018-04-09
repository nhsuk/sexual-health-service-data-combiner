const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadFile = require('./utils/downloadFile');
const merge = require('./utils/merge');
const saveDataAndUploadToAzure = require('./utils/saveDataAndUploadToAzure');
const enrich = require('./utils/enrich');

async function mergeAndUpload() {
  const shisData = await downloadFile(config.data.sources.shis);
  const csu25Data = await downloadFile(config.data.sources.csu25);

  const pharmacyData = await downloadFile(config.data.sources.pharmacy);
  const csatNhsData = await downloadFile(config.data.sources.csatNhs);
  const csatNonNhsData = await downloadFile(config.data.sources.csatNonNhs);

  const enrichedCsatNhsData = enrich(csatNhsData, pharmacyData, 'csatNhsData');
  const enrichedCsatNonNhsData = enrich(csatNonNhsData, pharmacyData, 'csatNonNhsData');

  const mergedData = merge([shisData, csu25Data, enrichedCsatNhsData, enrichedCsatNonNhsData]);

  await saveDataAndUploadToAzure(mergedData);
}

module.exports = mergeAndUpload;
