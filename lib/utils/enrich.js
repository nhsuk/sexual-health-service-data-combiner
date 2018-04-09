const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function enrich(ids, enrichmentData, description) {
  const startTime = process.hrtime();
  const enrichmentReportObject = {
    baseObjectCount: ids.length,
    enrichmentObjectCount: enrichmentData.length,
    mismatchedObjectCount: 0,
    mismatchedObjectIds: [],
  };

  const enrichedData = ids.map((idObj) => {
    const matchedObj =
      enrichmentData.find(enrichmentObj => enrichmentObj.identifier === idObj.odsCode);
    if (matchedObj) {
      return Object.assign({ type: idObj.serviceType }, matchedObj, idObj);
    }
    enrichmentReportObject.mismatchedObjectCount += 1;
    enrichmentReportObject.mismatchedObjectIds.push(idObj.odsCode);
    return matchedObj;
  }).filter(item => item);

  const endTime = process.hrtime(startTime);
  log.info(`Enriching dataset for ${description} took: ${prettyHrtime(endTime)}`);
  log.info(enrichmentReportObject, `${description} enrichment processing report`);
  return enrichedData;
}

module.exports = enrich;
