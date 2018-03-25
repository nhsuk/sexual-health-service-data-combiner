const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function merge(arr1, arr2) {
  const startTime = process.hrtime();
  const result = arr1.concat(arr2);
  const endTime = process.hrtime(startTime);
  log.info(`Merging data sets took: ${prettyHrtime(endTime)}`);
  return result;
}

module.exports = merge;
