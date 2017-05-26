var app = require('./src/server-config');

var port = process.env.PORT || 3001;

app.listen(port, function() {
  /* eslint-disable no-console */
  console.log('Find the server at: http://localhost:' + port);
  /* eslint-enable no-console */
});
