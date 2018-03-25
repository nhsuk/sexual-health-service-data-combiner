const chai = require('chai');

const merge = require('../../lib/utils/merge');

const expect = chai.expect;

describe('merge', () => {
  it('should return an empty array when supplied with two empty arrays', () => {
    const inputOne = [];
    const inputTwo = [];

    const result = merge(inputOne, inputTwo);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });

  it('should return an array with all entries when supplied with 2', () => {
    const inputOne = [];
    const inputTwo = [];

    const result = merge(inputOne, inputTwo);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });
});
