# Sexual Health Service Data Combiner

[![GitHub Release](https://img.shields.io/github/release/nhsuk/sexual-health-service-data-combiner.svg)](https://github.com/nhsuk/sexual-health-service-data-combiner/releases/latest/)
[![Greenkeeper badge](https://badges.greenkeeper.io/nhsuk/sexual-health-service-data-combiner.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/nhsuk/sexual-health-service-data-combiner.svg?branch=master)](https://travis-ci.org/nhsuk/sexual-health-service-data-combiner)
[![Coverage Status](https://coveralls.io/repos/github/nhsuk/sexual-health-service-data-combiner/badge.svg?branch=master)](https://coveralls.io/github/nhsuk/sexual-health-service-data-combiner?branch=master)

> Generates a single JSON file from multiple sources. The resulting file will
> be used by an instance of
> [elasticsearch-updater](https://github.com/nhsuk/elasticsearch-updater) to
> load into Elasticsearch.

## The data sources

The data sources are listed in [config.js](./config/config.js). Each data
source has two properties, the `filename` and the `url` (to an accessible JSON
file containing the data). The file must be a JSON array of objects.
Each file will be concatenated (along with some additional processing to ensure
integrity) to produce a merged data set
(`sexual-health-service-data-merged.json`). This will be uploaded into the
Azure Storage account specified in
`AZURE_STORAGE_CONNECTION_STRING`. The files will be uploaded into a container
as specified in `AZURE_BLOB_CONTAINER_NAME` or `etl-ouput`, if using the
default.
For example, if the storage account is `primarycare` and the defaults are used,
the merged data set will be available to download from
[https://primarycare.blob.core.windows.net/etl-output/sexual-health-service-data-merged.json](https://primarycare.blob.core.windows.net/etl-output/sexual-health-service-data-merged.json).

## Running the application and scheduling

The application will run at startup and then on a daily basis, while the
container continues to run. The time of day defaults to 7:15am, and can be
changed via the `UPDATE_SCHEDULE` environment variable. Further details on the
time format are available at
[here](https://www.npmjs.com/package/node-schedule)

The scheduler can be completely disabled by setting the `DISABLE_SCHEDULER`
variable to `true`. This sets the run date to run once in the future on Jan
1st, 2100.

## Environment variables

Environment variables are expected to be managed by the environment in which
the application is being run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

| Variable                           | Description                                               | Default                 | Required   |
| :--------------------------------- | :-------------------------------------------------------- | :---------------------- | :--------- |
| `AZURE_BLOB_CONTAINER_NAME`        | Azure storage container name                              | `etl-output`            |            |
| `AZURE_STORAGE_CONNECTION_STRING`  | Azure storage connection string                           |                         | yes        |
| `AZURE_TIMEOUT_MINUTES`            | Timeout in minutes before file upload errors              | 5                       |            |
| `DISABLE_SCHEDULER`                | Set to 'true' to disable the scheduler                    | `false`                 |            |
| `LOG_LEVEL`                        | [log level](https://github.com/trentm/node-bunyan#levels) | Depends on `NODE_ENV`   |            |
| `NODE_ENV`                         | Node environment                                          | `development`           |            |
| `UPDATE_SCHEDULE`                  | Time of day to run the upgrade                            | `15 7 * * *` (7:15 am)  |            |

## Architecture Decision Records

This repo uses
[Architecture Decision Records](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
to record architectural decisions for this project.
They are stored in [doc/adr](doc/adr).
