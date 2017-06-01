var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
