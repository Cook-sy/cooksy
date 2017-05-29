var express = require('express');
var router = express.Router();

// root route
router.get('/', function(req, res) {
  res.send('Hello from /api/meals' + req.path);
});

module.exports = router;
