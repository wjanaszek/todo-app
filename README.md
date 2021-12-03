

# TODO application

## Features
* ToDo features:
  * create a ToDo (only if user is an owner of given ToDo)
  * delete a ToDo (only if user is an owner of given ToDo)
  * update a ToDo (only if user is an owner of given ToDo)
  * list all user's ToDo
* Auth features:
  * create an account
  * login to retrieve a JWT token
  * reset password flow (with sending an email)
  * connection of AuthUser with ToDoAuthor by events (i.e. creating the AuthUser causes creating a duplicate ToDoAuthor record in ToDo domain)

Missing:
* soft and hard delete of a user
* roles and groups for users
* ToDo author with profile image (uploading files)

## Used technologies, hot-words etc.
CQRS<br>
End-to-end tests<br>
Hexagonal architecture<br>
Migrations<br>
TypeORM (with One-to-many relation)<br>
Seeding (with Faker)<br>
REST API<br>

## Running application locally
1. Make sure you have a docker container with PSQL database installed
2. Copy `.env-sample` and rename it to `.env`
3. Fill `.env` with values:
   1. database type: `postgres`
   2. database port: `5432`
   3. database username: `postgres`
   4. database password: `docker`
   5. jwt secret: `test` (or whatever you want)
   6. jwt expires in: `36000`
4. Start a PSQL container using `docker run --rm --name todo-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres`
5. Run `npm install`
6. Run `npm run seed:run`
7. Run `npm start`
8. Application will be available under `localhost:3000`

## Swagger
1. Run `npm install`
2. Run `npm start`
3. Go to `http://localhost:3000/swagger`

## Running end-to-end test
Assuming you have a docker container with database prepared (docker with PSQL database and seed has been run)
1. Run `npm install`
2. Run `npm run test api-todo-e2e`

# Nx

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
