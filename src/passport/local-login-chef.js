var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
var db = require('../models');

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    var userData = {
      username: username.trim(),
      password: password.trim()
    };

    return db.Chef
      .findOne({
        where: {
          username: userData.username
        }
      })
      .then(function(chef) {
        if (!chef) {
          var error = new Error('Incorrect username or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        return chef.comparePassword(userData.password).then(function(isMatch) {
          if (!isMatch) {
            var error = new Error('Incorrect username or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
          }

          var payload = {
            sub: chef.id,
            user: chef.username,
            role: 'chef',
            zipcode: chef.zipcode
          };

          var token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });

          return done(null, token);
        });
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
