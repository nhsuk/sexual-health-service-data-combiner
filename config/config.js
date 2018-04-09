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
      chlamydiaScreeningAndTreatmentNhs: {
        filename: 'csat-nhs-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csat-nhs-data.json',
      },
      chlamydiaScreeningAndTreatmentNonNhs: {
        filename: 'csat-non-nhs-data.json',
        url: 'https://primarycare.blob.core.windows.net/etl-output/csat-non-nhs-data.json',
      },
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
