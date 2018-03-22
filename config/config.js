module.exports = {
  app: {
    name: 'sexual-health-service-data-combiner',
  },
  blobContainerName: process.env.CONTAINER_NAME || 'etl-output',
  // percentage the records can drop by before erroring
  changeThreshold: Number(process.env.CHANGE_THRESHOLD) || 0.99,
  chlamydiaScreeningUnder25sFile: 'csu25.json',
  chlamydiaScreeningUnder25sURL: 'https://primarycare.blob.core.windows.net/etl-output/csu25-data.json',
  combinedDataFile: 'gp-data-merged.json',
  env: process.env.NODE_ENV || 'development',
  inputDir: './input',
  outputDir: './data',
  sexualHealthInformationServicesFile: 'shis.json',
  sexualHealthInformationServicesURL: 'https://primarycare.blob.core.windows.net/etl-output/shis-data.json',
};
