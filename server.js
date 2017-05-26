var app = require('./server-config');

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log('Find the server at: http://localhost:' + port);
});
