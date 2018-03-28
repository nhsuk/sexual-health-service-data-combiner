const chai = require('chai');

const config = require('../../config/config');

const expect = chai.expect;

describe('config', () => {
  let env;

  before('capture initial NODE_ENV', () => {
    env = process.env.NODE_ENV;
  });

  afterEach('reset NODE_ENV', () => {
    process.env.NODE_ENV = env;
  });

  it('should return just the filename when env is \'production\'', () => {
    process.env.NODE_ENV = 'production';

    const result = config.data.mergedDataFilename();

    expect(result).to.equal('sexual-health-service-data-merged.json');
  });

  it('should return the filename prepended with \'dev-\' when env is not \'production\'', () => {
    process.env.NODE_ENV = '';

    const result = config.data.mergedDataFilename();

    expect(result).to.equal('dev-sexual-health-service-data-merged.json');
  });
});
