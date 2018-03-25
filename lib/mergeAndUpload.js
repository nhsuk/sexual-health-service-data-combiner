const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadAndValidateFile = require('./utils/downloadAndValidateFile');
const merge = require('./utils/merge');
const saveDataAndUploadToAzure = require('./utils/saveDataAndUploadToAzure');

async function mergeAndUpload() {
  const shisData = await downloadAndValidateFile(
    config.sexualHealthInformationServices.url,
    config.sexualHealthInformationServices.file
  );
  const csu25Data = await downloadAndValidateFile(
    config.chlamydiaScreeningUnder25s.url,
    config.chlamydiaScreeningUnder25s.file
  );

  const mergedData = merge(shisData, csu25Data);

  await saveDataAndUploadToAzure(mergedData);
}

module.exports = mergeAndUpload;
