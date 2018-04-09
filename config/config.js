function getMergedDataFilename() {
  const prefix = process.env.NODE_ENV === 'production' ? '' : 'dev-';
  return `${prefix}sexual-health-service-data-merged.json`;
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
      csatNhs: {
        description: 'Pharmacy Service (NHS) - Chlamydia screening and treatment',
        filename: 'csat-nhs-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csat-nhs-data.json',
      },
      csatNonNhs: {
        description: 'Pharmacy Service (Non-NHS) - Chlamydia screening and treatment',
        filename: 'csat-non-nhs-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csat-non-nhs-data.json',
      },
      csu25: {
        description: 'GSD Service - Chlamydia screening under 25s',
        filename: 'csu25-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csu25-data.json',
      },
      pharmacy: {
        description: 'Organisation - Pharmacy',
        filename: 'pharmacy-data.json',
        url: 'https://nhsukpharmacydataetl.blob.core.windows.net/etl-output/pharmacy-data.json',
      },
      shis: {
        description: 'GSD Service - Sexual health information and support',
        filename: 'shis-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/shis-data.json',
      },
    },
  },
  env: process.env.NODE_ENV || 'development',
};
