const _request = require('request');

function getWeatherData(apiKey, lat, lng, callback) {

  _request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=si`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Cant get weather');
      callback(error);
      callback(response);
    }
  });
}

module.exports = {getWeatherData};
