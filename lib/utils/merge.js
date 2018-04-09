const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function merge(inputArray) {
  const startTime = process.hrtime();
  const result = inputArray.reduce((arr, cur) => arr.concat(cur));
  const endTime = process.hrtime(startTime);
  log.info(`Merging data sets took: ${prettyHrtime(endTime)}`);
  return result;
}

module.exports = merge;
