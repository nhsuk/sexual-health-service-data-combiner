function getMergedDataFilename() {
  const prefix = process.env.NODE_ENV === 'production' ? '' : 'dev-';
  return `${prefix}merged-data.json`;
}

module.exports = {
  app: {
    name: 'sexual-health-service-data-combiner',
  },
  blobContainerName: process.env.CONTAINER_NAME || 'etl-output',
  // percentage the records can drop by before erroring
  changeThreshold: Number(process.env.CHANGE_THRESHOLD) || 0.99,
  chlamydiaScreeningUnder25s: {
    filename: 'csu25-data.json',
    url: 'https://primarycare.blob.core.windows.net/etl-output/csu25-data.json',
  },
  dataDir: {
    current: './data/current',
    latest: './data/latest',
  },
  env: process.env.NODE_ENV || 'development',
  mergedDataFilename: getMergedDataFilename,
  sexualHealthInformationServices: {
    filename: 'shis-data.json',
    url: 'https://primarycare.blob.core.windows.net/etl-output/shis-data.json',
  },
};
