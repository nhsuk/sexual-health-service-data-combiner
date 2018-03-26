const request = require('request-promise-native');
const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

// function validateCurrentJsonAgainstLatestJson(json, path) {
//   const prevJson = fileHelper.loadJson(path);
//   if (json.length < prevJson.length * config.changeThreshold) {
//     throw new Error(`Total records has dropped from ${prevJson.length} to ${json.length}`);
//   }
// }

async function retrieveJson(url) {
  log.info(`Downloading file from ${url}`);
  const jsonString = await request(url);
  return jsonString ? JSON.parse(jsonString) : undefined;
}

async function downloadAndValidateFile(url, file) {
  const currentJsonFile = `${config.dataDir.current}/${file}`;
  let currentJson;
  try {
    currentJson = await retrieveJson(url);
    // validateCurrentJsonAgainstLatestJson(currentJson, currentJsonFile);
    fileHelper.saveJson(currentJson, currentJsonFile);
    log.info(`${currentJsonFile} saved`);
  } catch (ex) {
    log.error({ error: ex }, `Error retrieving file ${url}, using existing local file`);
  }
  return currentJson;
}

module.exports = downloadAndValidateFile;
