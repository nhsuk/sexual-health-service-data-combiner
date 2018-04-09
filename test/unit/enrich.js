const chai = require('chai');

const enrich = require('../../lib/utils/enrich');
const utils = require('../lib/utils');

const expect = chai.expect;

describe('enrich', () => {
  const odsCode = 'ABC123';

  describe('return value', () => {
    let output;
    const serviceType = 'type of service';
    const ids = [{ odsCode, serviceType }];
    const prop1 = 'prop1';

    before('run test', () => {
      const enrichmentData = [{ identifier: odsCode, prop1 }];
      output = enrich(ids, enrichmentData);
    });

    it('should be an array of objects', () => {
      utils.expectArray(output, ids.length);
    });

    it('should include properties from id object and enriched object', () => {
      expect(output[0].identifier).to.equal(odsCode);
      expect(output[0].odsCode).to.equal(odsCode);
      expect(output[0].prop1).to.equal(prop1);
      expect(output[0].serviceType).to.equal(serviceType);
    });

    it('should include a \'type\' property mapped from serviceType', () => {
      expect(output[0].type).to.equal(serviceType);
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
