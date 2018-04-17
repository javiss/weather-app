const _yargs = require('yargs');

const _axios = require('axios');

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

let encodedAddress = encodeURIComponent(argv.address);

let geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


_axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Cant find address');
  }
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/b164563876e51f727cbc982afcc99a8c/${lat},${lng}?units=si`;
  console.log(response.data.results[0].formatted_address);

  return _axios.get(weatherUrl).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} and feels like ${apparentTemperature}`);
  });

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Cant conect to API servers')
  } else {
    console.log(e.message);
  }
});
