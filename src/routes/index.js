var express = require('express');
var router = express.Router();

// root route
router.get('/', function(req, res) {
  res.send('Hello from ' + req.path);
});

// test route
router.get('/api/users', function(req, res) {
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
