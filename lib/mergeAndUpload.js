const requireEnv = require('require-environment-variables');
// requireEnvs must be at the top of the file as the azure-storage module uses the
// AZURE_STORAGE_CONNECTION_STRING variable on load
requireEnv(['AZURE_STORAGE_CONNECTION_STRING']);

const config = require('../config/config');
const downloadAndValidateFile = require('./downloadAndValidateFile');
const mergeFiles = require('./merge/mergeFiles');
const uploadOutputToAzure = require('./uploadOutputToAzure');

async function downloadFiles() {
  await downloadAndValidateFile(config.sexualHealthInformationServicesURL, config.sexualHealthInformationServicesFile);
  await downloadAndValidateFile(config.chlamydiaScreeningUnder25sURL, config.chlamydiaScreeningUnder25sFile);
}

async function mergeAndUpload() {
  await downloadFiles();
  mergeFiles();
  await uploadOutputToAzure();
}

module.exports = mergeAndUpload;
