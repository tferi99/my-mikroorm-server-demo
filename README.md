## Description

Project to demonstrate how to use [NestJS](https://github.com/nestjs/nest) framework with [MicroORM](mikro-orm.io).

## Installation

```bash
$ npm install
```

##  Database
Create database:
```
createdb -U postgres mymikroormdemo
```
Create database schema:
```
npm run createdbschema
```

_Note: Initial data will be created during the first startup._

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### OR

Import _postman/**my-mikroorm-server-demo.postman_collection.json**_ collection into [Postman](https://www.postman.com/) and use it for testing.
