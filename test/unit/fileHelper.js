const chai = require('chai');
const moment = require('moment');

const fileHelper = require('../../lib/utils/fileHelper');

const expect = chai.expect;

describe('fileHelper', () => {
  it('should return file name with today\'s date appended', () => {
    const filename = 'something';
    const filenameWithExtension = `${filename}.json`;
    const formattedDate = moment().format('YYYYMMDD');

    const result = fileHelper.getTimeStampedFilename(filenameWithExtension);

    expect(result).to.equal(`${filename}-${formattedDate}.json`);
  });
});
