// node app.js -a="Petra-Kelly-Straße 3, Munich,80797"
// node app-promise.js -a="Petra-Kelly-Straße 3, Munich,80797"
const _yargs = require('yargs');

const geocode = require('./geocode/geoCode');
const weather = require('./weather/weather');

const argv = _yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather from',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a,).then((results) => {
  console.log(JSON.stringify(results, undefined, 2));
  weather.getWeatherData('b164563876e51f727cbc982afcc99a8c', results.lat, results.lng,
    (errorMessage, weatherResults) => {
      if (errorMessage) {
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
}, (error) => {
  console.log( error);
});

