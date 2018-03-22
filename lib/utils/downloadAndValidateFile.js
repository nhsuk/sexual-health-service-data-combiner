const apiRequest = require('./utils/apiRequest');
const config = require('../config/config');
const fileHelper = require('./utils/fileHelper');
const log = require('./utils/logger');

function validatedAgainstPrevious(json, path) {
  const prevJson = fileHelper.loadJson(path);
  if (json.length < prevJson.length * config.changeThreshold) {
    throw new Error(`Total records has dropped from ${prevJson.length} to ${json.length}`);
  }
}

async function retrieveJson(url) {
  log.info(`Downloading file from ${url}`);
  const jsonString = await apiRequest(url);
  return jsonString ? JSON.parse(jsonString) : undefined;
}

async function downloadAndValidateFile(url, filename) {
  const existingFile = `${config.inputDir}/${filename}`;
  try {
    const newJson = await retrieveJson(url);
    validatedAgainstPrevious(newJson, existingFile);
    fileHelper.saveJson(newJson, existingFile);
    log.info(`${existingFile} saved`);
  } catch (ex) {
    log.error({ error: ex }, `Error retrieving file ${url}, using existing local file`);
  }
}

module.exports = downloadAndValidateFile;
