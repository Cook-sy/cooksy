var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_GEOCODE_KEY
});

module.exports = function(instance, options, cb) {
  googleMapsClient.geocode({
    address: instance.address + ', ' + instance.city + ', ' + instance.state + ' ' + instance.zipcode
  }, function(err, response) {
    if (!err) {
      var latLng = response.json.results[0].geometry.location;
      instance.point = {
        type: 'POINT',
        coordinates: [latLng.lat, latLng.lng]
      };
      return cb(null, options);
    }
  });
};
