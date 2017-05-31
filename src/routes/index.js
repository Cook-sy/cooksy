var express = require('express');
var router = express.Router();

var isUser = require('../middleware/is-authenticated').isUser;

// root route
router.get('/', function(req, res) {
  res.send('Hello from ' + req.path);
});

// test route
router.get('/api/users', isUser, function(req, res) {
  res.json({
    results: [
      {
        name: 'bono'
      },
      {
        name: 'jono'
      },
      {
        name: 'pono'
      },
      {
        name: 'mono'
      }
    ]
  });
});

module.exports = router;
