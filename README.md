# Cooksy

## Getting started

### Installing PostgreSQL and PostGIS
Install PostgreSQL and PostGIS according to your operating system. If you're on a Mac, see [Postgres.app](https://postgresapp.com/).

If you're on Ubuntu, install PostGIS with
```
$ sudo apt-get install postgis postgresql-VERSION_POSTGRES-postgis-VERSION_POSTGIS
```
where `VERSION_POSTGRES` and `VERSION_POSTGIS` are dependent on what version you're installing.

Create a user and two databases for development and testing. To add PostGIS support to the databases, run `CREATE EXTENSION postgis;` against each database that you have.

If you're on Ubuntu, you can run
```
$ sudo -u postgres psql -c "CREATE EXTENSION postgis;" DATABASE_NAME_HERE
```
for each database that you want PostGIS to be enabled.

### Configuring environment variables
Create a `.env` file in the root directory and follow the example `.env.example`.

### Creating table of zipcodes
From the root directory of the repository, run the command
```
$ node src/create-zipcodes.js && NODE_ENV=test node src/create-zipcodes.js
```
to create a table of zipcodes in your database and test database.

### Installing dependencies
To get started with development, clone the repo and run the following commands:
- `cd cooksy`
- `npm install`
- `npm start`

The `npm start` command will start up two servers. It will start up the backend server which is found at `http://localhost:3001`. The second server is for the frontend which is found at `http://localhost:3000`.

To develop on the frontend, navigate to the `client` directory in a separate terminal (`cd client`), and run the commands:
- `npm install`
- `npm test`

The tests will be run in an interactive/watch mode.

### Seeding database
If you want to seed the database, run the command from the root directory
```
$ node src/seedDB.js
```
from the root directory.

For testing, you'll have to seed your test database. Run the command
```
$ NODE_ENV=test node src/seedDB.js
```

### Tests on the server side

The provided tests utilize the Mocha, Chai, supertest and Sinon testing libraries, and may be run with the `npm run test:server` command from within the `cooksy` directory. This command will also generate and display a coverage report, provided by the Istanbul/nyc utility.

On the initial test, some tests may fail. Please run the the test again.

If you would prefer to generate an HTML coverage view, you may run the `npm run test:html` command. After the script has executed, navigate to the `cooksy/coverage` directory and open the `index.html` file in your browser.

## Deployment on Heroku
To deploy on Heroku, run
```
$ heroku create
$ git push heroku master
```
There is a npm `heroku-postbuild` script that will build the frontend after the server is built.

Afterwards, set the appropriate environment variables in Heroku. See the file `.env` for what environment variables are necessary (`JWT_SECRET` and `DATABASE_URL`).

A PostgreSQL database with PostGIS enabled is required. Either provision one on Heroku or use another database service. The `Zipcodes` table needs to be created on the database. Note that this will exceed the 10,000 row limit on the free tier of Heroku PostgreSQL. To create the `Zipcodes` table, set `DATABASE_URL` in the file `.env` to your production database URL. Then run
```
$ NODE_ENV=production node src/create-zipcodes.js
```


## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

### Roadmap

View the project roadmap [here](https://github.com/Cook-sy/cooksy/issues)
