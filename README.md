# Cooksy

## Getting started

### Configuring environment variables
Create a `.env` file in the root directory and follow the example `.env.example`.

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
If you want to seed the database, run the command
```
$ sequelize db:seed:all
```
from the root directory. Replace `sequelize` with `node_modules/.bin/sequelize` if `sequelize-cli` is not installed globally.

For testing, you'll have to seed your test database. Run the command
```
$ NODE_ENV=test sequelize db:seed:all
```

### Tests on the server side

The provided tests utilize the Mocha, Chai, supertest and Sinon testing libraries, and may be run with the `npm run test:server` command from within the `cooksy` directory. This command will also generate and display a coverage report, provided by the Istanbul/nyc utility.

On the initial test, some tests may fail. Please run the the test again.

If you would prefer to generate an HTML coverage view, you may run the `npm run test:html` command. After the script has executed, navigate to the `cooksy/coverage` directory and open the `index.html` file in your browser.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

### Roadmap

View the project roadmap [here](https://github.com/Cook-sy/cooksy/issues)
