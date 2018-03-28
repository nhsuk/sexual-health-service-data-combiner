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

  it('should return an array with all entries when supplied with two non-empty arrays', () => {
    const inputOne = [1];
    const inputTwo = [2];
    const expectedMergedArrayLength = inputOne.length + inputTwo.length;

    const result = merge(inputOne, inputTwo);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(expectedMergedArrayLength);
    expect(result[0]).to.equal(inputOne[0]);
    expect(result[1]).to.equal(inputTwo[0]);
  });
});
