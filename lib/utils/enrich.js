const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function enrich(ids, enrichmentData, whitelistedProperties, description) {
  const startTime = process.hrtime();
  let mismatchedCount = 0;
  const mismatchedIds = [];

  const enrichedData = ids.reduce((accumulator, currentId) => {
    const enrichmentSource =
      enrichmentData.find(enrichmentObj => enrichmentObj.identifier === currentId.odsCode);
    if (enrichmentSource) {
      const whiteListedEnrichmentData = { };
      whitelistedProperties.forEach((prop) => {
        whiteListedEnrichmentData[prop] = enrichmentSource[prop];
      });
      accumulator.push(Object.assign(currentId, whiteListedEnrichmentData));
    } else {
      mismatchedCount += 1;
      mismatchedIds.push(currentId.odsCode);
    }
    return accumulator;
  }, []);

  const enrichmentReport = {
    baseDataCount: ids.length,
    enrichmentDataCount: enrichmentData.length,
    mismatchedCount,
    mismatchedIds,
    timeTaken: prettyHrtime(process.hrtime(startTime)),
  };
  log.info(enrichmentReport, `${description} enrichment processing report`);

  return enrichedData;
}

module.exports = enrich;
