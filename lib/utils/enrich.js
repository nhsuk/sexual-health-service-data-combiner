const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function enrich(ids, enrichmentData, description) {
  const startTime = process.hrtime();
  let mismatchedCount = 0;
  const mismatchedIds = [];

  const enrichedData = ids.reduce((accumulator, currentId) => {
    const enrichmentSource =
      enrichmentData.find(enrichmentObj => enrichmentObj.identifier === currentId.odsCode);
    if (enrichmentSource) {
      const whiteListedEnrichmentData = {
        address: enrichmentSource.address,
        contacts: enrichmentSource.contacts,
        identifier: enrichmentSource.identifier,
        location: enrichmentSource.location,
        name: enrichmentSource.name,
        openingTimes: enrichmentSource.openingTimes,
        summary: enrichmentSource.summary,
      };
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
