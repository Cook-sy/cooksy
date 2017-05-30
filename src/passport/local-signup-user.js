var jwt = require('jsonwebtoken');
var db = require('../models');
var Strategy = require('passport-local').Strategy;

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    db.User
      .create({
        username: username.trim(),
        password: password.trim(),
        zipcode: req.body.zipcode.trim()
      })
      .then(function(user) {
        var payload = {
          sub: user.id,
          user: user.username,
          role: 'user',
          zipcode: user.zipcode
        };

        var token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '7d'
        });

        return done(null, token);
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
