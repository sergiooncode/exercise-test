# Take Home Test: Exercises API

## Installation

The app relies on a PostgreSQL database whose use is justified in Considerations section of this documentation. That database is deployed using Docker for convenience.

## Running the app

```bash
# initialize dotenv file
$ cp env.template .env

# start containers
$ docker-compose up --build -d

# installation dependencies
$ npm install

# run migrations
$ npx typeorm migration:run
```

# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

## How to use the API

- Create a user

```bash
curl --request POST -H "Content-Type: application/json" --data '{"name":"Foo Bar","password":"123456"}' http://localhost:3000/auth/register
```

- Create a JWT token

```bash
curl --request POST -H "Content-Type: application/json" --data '{"name":"Foo Bar","password":"123456"}' http://localhost:3000/auth/login
```

- Copy the token in accessToken field of the reponse in previous step

- Create an exercise (copy token from previous step in place of <jwt_token>)
curl --request POST -H "Authorization: Bearer <jwt_token>" -H "Content-Type: application/json" --data '{"content":"lorem ipsum"}' http://localhost:3000/exercises

- Get all exercises (copy token from previous step in place of <jwt_token>)
curl -H "Authorization: Bearer <jwt_token>"  http://localhost:3000/exercises

## Considerations

- I decided to use PostgreSQL instead of something simpler like SQLite because of the requirement of using UUID as PK/FK id in the data model
- 

## To Do

- Add test to auth domain
- Improve test coverage of users domain
- Try to move migration folder to each of the apps (exercises and users)
