const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function enrich(ids, enrichmentData, description) {
  const startTime = process.hrtime();
  const enrichmentReportObj = {
    baseObjectCount: ids.length,
    enrichmentObjectCount: enrichmentData.length,
    mismatchedObjectCount: 0,
    mismatchedObjectIds: [],
  };

  const enrichedData = ids.reduce((accumulator, currentIdObj) => {
    const matchedObj =
      enrichmentData.find(enrichmentObj => enrichmentObj.identifier === currentIdObj.odsCode);
    if (matchedObj) {
      accumulator.push(Object.assign({ type: currentIdObj.serviceType }, matchedObj, currentIdObj));
    }
    enrichmentReportObj.mismatchedObjectCount += 1;
    enrichmentReportObj.mismatchedObjectIds.push(currentIdObj.odsCode);
    return accumulator;
  }, []);

  const endTime = process.hrtime(startTime);
  log.info(`Enriching dataset for ${description} took: ${prettyHrtime(endTime)}`);
  log.info(enrichmentReportObj, `${description} enrichment processing report`);
  return enrichedData;
}

module.exports = enrich;
