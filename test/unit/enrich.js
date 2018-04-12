const chai = require('chai');

const enrich = require('../../lib/utils/enrich');
const utils = require('../lib/utils');

const expect = chai.expect;

const odsCode = 'ABC123';
const addressPropertyName = 'address';
const namePropertyName = 'name';
const nonWhitelistedPropertyName = 'nonWhitelistedProperty';
const whitelistedProperties = [addressPropertyName, namePropertyName];

function createEnrichmentSource() {
  const enrichmentSource = { };
  enrichmentSource.identifier = odsCode;
  enrichmentSource[addressPropertyName] = {
    city: 'city',
    line1: 'line1',
    line2: 'line2',
    postcode: 'postcode',
  };
  enrichmentSource[namePropertyName] = 'name';
  enrichmentSource[nonWhitelistedPropertyName] = 'this is not whitelisted and should not be output';
  return enrichmentSource;
}

describe('enrich', () => {
  describe('return value', () => {
    let output;
    const ids = [{ odsCode }];
    const enrichmentSource = createEnrichmentSource();

    before('run test', () => {
      const enrichmentData = [enrichmentSource];
      output = enrich(ids, enrichmentData, whitelistedProperties);
    });

    it('should be an array of objects', () => {
      utils.expectArray(output, ids.length);
    });

    it('should include properties from id object', () => {
      expect(output[0].odsCode).to.equal(odsCode);
    });

    it('should include whitelisted properties from enriched object', () => {
      expect(whitelistedProperties.length).to.equal(2);
      whitelistedProperties.forEach((prop) => {
        expect(output[0][prop]).to.equal(enrichmentSource[prop]);
      });
    });

    it('should not include non-whitelisted properties from enriched object', () => {
      expect(output[0][nonWhitelistedPropertyName]).to.be.undefined;
    });
  });

  describe('mismatched dataset handling', () => {
    it('should not return items when it only exists in the ids dataset', () => {
      const ids = [{ odsCode }];
      const enrichedData = [];

      const output = enrich(ids, enrichedData);

      utils.expectArray(output, 0);
    });

    it('should not return items when it only exists in the enriched dataset', () => {
      const ids = [];
      const enrichedData = [{ identifier: odsCode }];

      const output = enrich(ids, enrichedData);

      utils.expectArray(output, 0);
    });
  });
});
