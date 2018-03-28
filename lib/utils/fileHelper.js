const fs = require('fs');

const moment = require('moment');

function saveJson(obj, filename) {
  const json = JSON.stringify(obj);
  fs.writeFileSync(filename, json, 'utf8');
}

function loadJson(path) {
  const jsonString = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : undefined;
  return jsonString ? JSON.parse(jsonString) : [];
}

function getDateYYYYMMDD(date) {
  return moment(date).format('YYYYMMDD');
}

function getTimeStampedFilename(filename) {
  return filename.replace('.json', `-${getDateYYYYMMDD(new Date())}.json`);
}

module.exports = {
  getTimeStampedFilename,
  loadJson,
  saveJson,
};
