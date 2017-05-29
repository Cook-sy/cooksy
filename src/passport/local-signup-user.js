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
      .then(function() {
        return done(null);
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
