const request = require('request-promise-native');
const VError = require('verror');

const config = require('../../config/config');
const fileHelper = require('./fileHelper');
const log = require('./logger');

async function retrieveJson(url) {
  log.info(`Downloading file from ${url}`);
  let json;
  try {
    json = await request(url);
  } catch (ex) {
    log.error({ error: new VError(ex, `Error downloading file from ${url}`) });
  }
  return json ? JSON.parse(json) : undefined;
}

async function downloadAndValidateFile(url, file) {
  const currentJsonFile = `${config.data.dir.current}/${file}`;
  let currentJson;
  try {
    currentJson = await retrieveJson(url);
    fileHelper.saveJson(currentJson, currentJsonFile);
    log.info(`${currentJsonFile} saved`);
  } catch (ex) {
    log.error({ error: new VError(ex, `Error during download and save of file ${url}`) });
  }
  return currentJson;
}

module.exports = downloadAndValidateFile;
