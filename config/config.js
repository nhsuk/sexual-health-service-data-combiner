function getMergedDataFilename() {
  const prefix = process.env.NODE_ENV === 'production' ? '' : 'dev-';
  return `${prefix}merged-data.json`;
}

module.exports = {
  app: {
    name: 'sexual-health-service-data-combiner',
  },
  blobContainerName: process.env.AZURE_BLOB_CONTAINER_NAME || 'etl-output',
  data: {
    dir: {
      current: './data/current',
      latest: './data/latest',
    },
    mergedDataFilename: getMergedDataFilename,
    sources: {
      chlamydiaScreeningUnder25s: {
        filename: 'csu25-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csu25-data.json',
      },
      sexualHealthInformationServices: {
        filename: 'shis-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/shis-data.json',
      },
    },
  },
  env: process.env.NODE_ENV || 'development',
};
