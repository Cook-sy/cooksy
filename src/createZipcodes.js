var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');
var db = require('./models');

var csvZipcode = [];

fs.createReadStream(path.join(__dirname, 'zipcodes.txt'))
  .pipe(parse({ delimiter: ',', columns: true }))
  .on('data', function(row) {
    csvZipcode.push(row);
  })
  .on('end', function() {
    db.Zipcode.sync({ force: true })
      .then(function() {
        return db.Zipcode.bulkCreate(csvZipcode);
      });
  });
