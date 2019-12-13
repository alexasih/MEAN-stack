const express = require('express');
const router = express.Router();
const request = require('request');
const db = require('../mongo/mongo');

router.route('/')
    .get(function (req, res, next) {
        const apiKey = process.env.MY_WEATHER_API_KEY;
        const city = 'boston';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let mongo = db.getDB();

        request(url, function (err, response, body) {
            if (err) {
                console.log('error:', err);
            } else {
                let currentWeather = JSON.parse(body);
                if (currentWeather.main == undefined || currentWeather.weather == undefined) {
                    res.send(({
                        weather: 'Error, please try again'
                    }));
                } else {
                    mongo.collection('weatherdata').find({'temperature': `${currentWeather.main.temp}`}).count((err, countValue) => {
                        if (countValue > 0) {
                            mongo.collection('weatherdata').findOne({'temperature': `${currentWeather.main.temp}`}, (err, result) => {
                                if (err) throw err;
                                console.log(result);
                                console.log("Already in DB");
                                res.send(({
                                  description: `${result.description}`,
                                  temperature: `${result.temperature}`,
                                  city: `${result.city}`
                                }));
                            });
                        } else {
                            mongo.collection('weatherdata').insertOne({
                                description: `${currentWeather.weather[0].description}`,
                                temperature: `${currentWeather.main.temp}`,
                                city: `${currentWeather.name}`
                            });

                            mongo.collection('weatherdata').findOne({'temperature': `${currentWeather.main.temp}`}, (err, result) => {
                                if (err) throw err;
                              console.log("Not in DB yet");
                                res.send(({
                                    description: `${result.description}`,
                                    temperature: `${result.temperature}`,
                                    city: `${result.city}`
                                }));
                            });
                        }
                    })
                }
            }
        });
    });

db.connect((err, client) => {
    if (err) {
        console.log(`ERR: ${err}`);
    } else {
        console.log(`Connected`);
    }
});

module.exports = router;
