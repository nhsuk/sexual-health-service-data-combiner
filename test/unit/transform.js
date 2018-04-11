const chai = require('chai');

const transform = require('../../lib/utils/transform');
const utils = require('../lib/utils');

const expect = chai.expect;

describe('transform', () => {
  describe('happy path', () => {
    let output;
    const postcode = 'AB1234CD';
    const address = {
      city: 'city',
      county: 'county',
      line1: 'line1',
      line2: 'line2',
      line3: 'line3',
      postcode,
    };
    const expectedAddressLines = `${address.line1}, ${address.line2}, ${address.line3}, ${address.city}, ${address.county}`;

    before('run test', () => {
      const input = [{ address }];

      output = transform(input);
    });

    it('should return an array of objects', () => {
      utils.expectArray(output, 1);
    });

    it('should return objects with an \'address\' property as an object', () => {
      expect(output[0].address).to.be.an('object');
    });

    it('should return objects with a \'postcode\' property the same as the input postcode', () => {
      expect(output[0].address.postcode).to.equal(postcode);
    });

    it('should return objects with properties from address removed', () => {
      expect(output[0].address.line1).to.be.undefined;
      expect(output[0].address.line2).to.be.undefined;
      expect(output[0].address.line3).to.be.undefined;
      expect(output[0].address.city).to.be.undefined;
      expect(output[0].address.county).to.be.undefined;
    });

    it('should add new property \'addressLines\', consisting of address properties excluding postcode', () => {
      expect(output[0].address.addressLines).to.equal(expectedAddressLines);
    });
  });

  describe('error conditions', () => {
    it('should return objects with no address', () => {
      const input = [{}];

      const output = transform(input);

      utils.expectArray(output, 1);
      expect(output[0].address).to.be.undefined;
    });

    it('should return objects with addressLine when only one property exists', () => {
      const input = [{ address: { line1: 'line1' } }];

      const output = transform(input);

      utils.expectArray(output, 1);
      expect(output[0].address).to.be.an('object');
      expect(output[0].address.addressLines).to.be.a('string');
      expect(output[0].address.addressLines).to.equal('line1');
    });

    it('should return objects with addressLine when several properties do not exist', () => {
      const input = [{
        address: {
          county: 'county',
          line1: 'line1',
        },
      }];

      const output = transform(input);

      utils.expectArray(output, 1);
      expect(output[0].address).to.be.an('object');
      expect(output[0].address.addressLines).to.be.a('string');
      expect(output[0].address.addressLines).to.equal('line1, county');
    });
  });
});
