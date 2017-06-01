var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
var userCtrl = require('../controllers/user-ctrl');

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    return userCtrl.createUser(req.body, username, password)
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
