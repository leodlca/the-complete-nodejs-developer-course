const axios = require('axios');

const config = require('../config');

function getTemperature(lat, lng, address) {

    return new Promise((resolve, reject) => {

        axios.get(`https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/${lat},${lng}`)
        .then(res => {
            res = res.data;

            resolve({
                summary: res.currently.summary, 
                temperature: res.currently.temperature,
                address
            });
        }).catch(err => {
            reject('Unable to fetch wheater.');
        });

    });

}

module.exports = {
    getTemperature
}
