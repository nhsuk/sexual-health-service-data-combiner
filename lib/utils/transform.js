const prettyHrtime = require('pretty-hrtime');

const log = require('../utils/logger');

function deleteAddressProperties(address) {
  /* eslint-disable no-param-reassign */
  delete address.line1;
  delete address.line2;
  delete address.line3;
  delete address.city;
  delete address.county;
  /* eslint-enable no-param-reassign */
}

function transform(data) {
  const startTime = process.hrtime();

  data.forEach((item) => {
    if (!item.address) {
      return;
    }
    const addressLines = [];
    if (item.address.line1) { addressLines.push(item.address.line1); }
    if (item.address.line2) { addressLines.push(item.address.line2); }
    if (item.address.line3) { addressLines.push(item.address.line3); }
    if (item.address.city) { addressLines.push(item.address.city); }
    if (item.address.county) { addressLines.push(item.address.county); }
    // eslint-disable-next-line no-param-reassign
    item.address.addressLines = addressLines.join(', ');

    deleteAddressProperties(item.address);
  });

  const endTime = process.hrtime(startTime);
  log.info(`Transforming datasets took: ${prettyHrtime(endTime)}`);

  return data;
}

module.exports = transform;
