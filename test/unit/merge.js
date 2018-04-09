const chai = require('chai');

const merge = require('../../lib/utils/merge');
const utils = require('../lib/utils');

const expect = chai.expect;

describe('merge', () => {
  it('should return an empty array when run with an array of single empty array', () => {
    const input = [[]];

    const output = merge(input);

    utils.expectArray(output, 0);
  });

  it('should return an empty array when run with an array of several empty arrays', () => {
    const input = [[], [], []];

    const output = merge(input);

    utils.expectArray(output, 0);
  });

  it('should return an array with all entries when run with a single non-empty array', () => {
    const input = [[1, 2, 3, 4, 5]];
    const expectedLength = input[0].length;

    const output = merge(input);

    utils.expectArray(output, expectedLength);
    expect(output).to.equal(input[0]);
  });

  it('should return an array with all entries when run with a two non-empty arrays and an empty array', () => {
    const arr1 = [1];
    const arr2 = [2];
    const arrEmpty = [];
    const input = [arr1, arr2, arrEmpty];
    const expectedLength = arr1.length + arr2.length + arrEmpty.length;

    const output = merge(input);

    utils.expectArray(output, expectedLength);
    expect(output[0]).to.equal(arr1[0]);
    expect(output[1]).to.equal(arr2[0]);
  });

  it('should return an array with all entries when run with a three non-empty arrays', () => {
    const arr1 = [1];
    const arr2 = [2];
    const arr3 = [3];
    const input = [arr1, arr2, arr3];
    const expectedLength = arr1.length + arr2.length + arr3.length;

    const output = merge(input);

    utils.expectArray(output, expectedLength);
    expect(output[0]).to.equal(arr1[0]);
    expect(output[1]).to.equal(arr2[0]);
    expect(output[2]).to.equal(arr3[0]);
  });
});
