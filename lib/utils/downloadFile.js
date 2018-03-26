const request = require('request-promise-native');
const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

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
    fileHelper.saveJson(currentJson, currentJsonFile);
    log.info(`${currentJsonFile} saved`);
  } catch (ex) {
    log.error({ error: ex }, `Error retrieving file ${url}, using existing local file`);
  }
  return currentJson;
}

module.exports = downloadAndValidateFile;
