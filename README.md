# Take Home Test: Exercises API

## Installation

The app relies on a PostgreSQL database whose use is justified in Considerations section of this documentation.

The 

## Running the app

```bash
# start containers
docker-compose

# run migrations
npx typeorm migration:run
```

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
```

## How to use the API

- Create an exercise
curl --request POST -H "Authorization: Bearer <jwt_token>" -H "Content-Type: application/json" --data '{"content":"lorem ipsum"}' http://localhost:3000/exercises

- Get all exercises
curl -H "Authorization: Bearer <jwt_token>"  http://localhost:3000/exercises

## Considerations

- I decided to use PostgreSQL instead of something simpler like SQLite because of the requirement of using UUID as PK/FK id in the data model

## To Do

- Add test to auth domain
- Improve test coverage of users domain
- Try to move migration folder to each of the apps (exercises and users)
