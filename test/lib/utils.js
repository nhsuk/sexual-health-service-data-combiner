const chai = require('chai');

const expect = chai.expect;

function expectArray(input, length) {
  expect(input).to.be.an('array');
  expect(input.length).to.equal(length);
}

module.exports = {
  expectArray,
};
