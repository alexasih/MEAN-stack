const express = require('express');
const router = express.Router();
const pug = require('pug');
const compiledFunction = pug.compileFile('views/ps4.pug');
const request = require('request');

router.route('/')
    .get(function (req, res, next) {
        const apiKey = 'ALEXAS_API_KEY';
        const city = 'boston';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        request(url, function (err, response, body) {
            if(err){
                console.log('error:', err);
            } else {
                let currentWeather = JSON.parse(body);
                if(currentWeather.main == undefined && currentWeather.weather==undefined){
                    res.send(compiledFunction({
                        weather: 'Error, please try again'
                    }));
                } else {
                    res.send(compiledFunction({
                        weather: `Today's weather is ${currentWeather.weather[0].description}. Currently, the temperature is at ${currentWeather.main.temp} degrees in ${currentWeather.name}!`,
                        body: body
                    }));
                }
            }
        });

    });

module.exports = router;

