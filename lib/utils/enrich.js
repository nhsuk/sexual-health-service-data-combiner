const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function enrich(ids, enrichmentData, description) {
  const startTime = process.hrtime();
  let mismatchedObjectCount = 0;
  const mismatchedObjectIds = [];

  const enrichedData = ids.reduce((accumulator, currentIdObj) => {
    const matchedObj =
      enrichmentData.find(enrichmentObj => enrichmentObj.identifier === currentIdObj.odsCode);
    if (matchedObj) {
      accumulator.push(Object.assign(matchedObj, currentIdObj));
    } else {
      mismatchedObjectCount += 1;
      mismatchedObjectIds.push(currentIdObj.odsCode);
    }
    return accumulator;
  }, []);

  const enrichmentReportObj = {
    baseObjectCount: ids.length,
    enrichmentObjectCount: enrichmentData.length,
    mismatchedObjectCount,
    mismatchedObjectIds,
    timeTaken: prettyHrtime(process.hrtime(startTime)),
  };
  log.info(enrichmentReportObj, `${description} enrichment processing report`);

  return enrichedData;
}

module.exports = enrich;
