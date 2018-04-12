const chai = require('chai');

const enrich = require('../../lib/utils/enrich');
const utils = require('../lib/utils');

const enrichmentSource = require('../resources/sample-pharmacy');

const expect = chai.expect;

describe('enrich', () => {
  const odsCode = 'ABC123';

  describe('return value', () => {
    let output;
    const ids = [{ odsCode }];
    const nonWhiteListedPropertyName = 'nonWhiteListedProperty';

    before('run test', () => {
      enrichmentSource[nonWhiteListedPropertyName] = 'this is not whitelisted and should not be output';
      const enrichmentData = [enrichmentSource];
      output = enrich(ids, enrichmentData);
    });

    it('should be an array of objects', () => {
      utils.expectArray(output, ids.length);
    });

    it('should include properties from id object', () => {
      expect(output[0].odsCode).to.equal(odsCode);
    });

    it('should include whitelisted properties from enriched object', () => {
      expect(output[0].address).to.equal(enrichmentSource.address);
      expect(output[0].contacts).to.equal(enrichmentSource.contacts);
      expect(output[0].identifier).to.equal(enrichmentSource.identifier);
      expect(output[0].identifier).to.equal(odsCode);
      expect(output[0].location).to.equal(enrichmentSource.location);
      expect(output[0].name).to.equal(enrichmentSource.name);
      expect(output[0].openingTimes).to.equal(enrichmentSource.openingTimes);
      expect(output[0].summary).to.equal(enrichmentSource.summary);
    });

    it('should not include non-whitelisted properties from enriched object', () => {
      expect(output[0][nonWhiteListedPropertyName]).to.be.undefined;
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
