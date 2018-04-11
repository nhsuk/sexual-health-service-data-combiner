const prettyHrtime = require('pretty-hrtime');

const enrich = require('./enrich');
const log = require('../utils/logger');
const transform = require('./transform');

function enrichAndTransform(ids, enrichmentData, description) {
  const startTime = process.hrtime();

  const enrichedData = enrich(ids, enrichmentData, description);
  const transformedData = transform(enrichedData);

  const endTime = process.hrtime(startTime);
  log.info(`Enrichment and transformation took ${prettyHrtime(endTime)}`);
  return transformedData;
}

module.exports = enrichAndTransform;
