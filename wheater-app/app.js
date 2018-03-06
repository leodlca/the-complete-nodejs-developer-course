
const yargs = require('yargs');

const config = require('./config');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const unitConversion = require('./forecast/unitConversion');

console.log('\nPowered by Dark Sky and Google Maps API.\n\n');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .argv;

geocode.geocodeAddress(argv.address).then(res => {

    const address = res.address;
    const lat = res.location.lat;
    const lng = res.location.lng;

    return forecast.getTemperature(lat, lng, address)

}).then(res => {

    const celsiusTemperature = unitConversion.fahrToCelsius(res.temperature);

    console.log(`Current wheater at: ${res.address}`);
    console.log(`==> ${res.summary}, ${celsiusTemperature.toFixed(2)}°C.\n`);

}).catch(err => {

    console.log(err);

});

