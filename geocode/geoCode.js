const _request = require('request');

function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    _request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        console.log(error);
        reject('Cant connect');
      } else if (body.status === 'ZERO_RESULTS') {
        console.log(body);
        reject('No results found');
      } else if (body.status === 'OK') {
        console.log(body);
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      }
    });
  });
}

module.exports = {
  geocodeAddress
};