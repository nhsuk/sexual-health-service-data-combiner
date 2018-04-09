const chai = require('chai');

const merge = require('../../lib/utils/merge');

const expect = chai.expect;

describe('merge', () => {
  it('should return an empty array when run with an array of single empty array', () => {
    const input = [[]];

    const output = merge(input);

    expect(output).to.be.an('array');
    expect(output.length).to.equal(0);
  });

  it('should return an empty array when run with an array of three empty arrays', () => {
    const input = [[], [], []];

    const output = merge(input);

    expect(output).to.be.an('array');
    expect(output.length).to.equal(0);
  });

  it('should return an array with all entries when run with a single non-empty array', () => {
    const input = [[1, 2, 3, 4, 5]];
    const expectedMergedArrayLength = input[0].length;

    const output = merge(input);

    expect(output).to.be.an('array');
    expect(output.length).to.equal(expectedMergedArrayLength);
    expect(output).to.equal(input[0]);
  });

  it('should return an array with all entries when run with a three non-empty arrays', () => {
    const arr1 = [1];
    const arr2 = [2];
    const arr3 = [3];
    const input = [arr1, arr2, arr3];
    const expectedMergedArrayLength = arr1.length + arr2.length + arr3.length;

    const output = merge(input);

    expect(output).to.be.an('array');
    expect(output.length).to.equal(expectedMergedArrayLength);
    expect(output[0]).to.equal(arr1[0]);
    expect(output[1]).to.equal(arr2[0]);
    expect(output[2]).to.equal(arr3[0]);
  });
});
