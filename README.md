## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Creating the ormconfig.json

```bash
$ yarn run build:ormconfig
```

## Running the db

```bash
# start
$ yarn run start:db

# stop
$ yarn run stop:db
```

## DB migrations

```bash
# create a migration
$ yarn run migration:create fileName

# run migrations
$ yarn run migration:run

# revert
$ yarn run migration:revert
```

## DB seeds

```bash
# create a seed
$ yarn run seed:create fileName

# run seeds
$ yarn run seed:run

# revert
$ yarn run seed:revert
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).
