const express = require('express');
const router = express.Router();
const pug = require('pug');
const compiledFunction = pug.compileFile('views/ps6.pug');
const request = require('request');
const db = require('../mongo/mongo');

// OLD FUNCTION
router.route('/')
    .get(function (req, res, next) {
        const apiKey = 'ALEXAS_API_KEY';
        const city = 'boston';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let mongo = db.getDB();

        request(url, function (err, response, body) {
            if(err){
                console.log('error:', err);
            } else {
                let currentWeather = JSON.parse(body);
                if(currentWeather.main == undefined || currentWeather.weather==undefined){
                    res.send(compiledFunction({
                        weather: 'Error, please try again'
                    }));
                } else {
                    if (mongo.collection('weatherdata').find({'temperature': `${currentWeather.main.temp}`}).limit(1)) {
                        mongo.collection('weatherdata').findOne({}, {'temperature': `${currentWeather.main.temp}`}, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            res.send(compiledFunction({
                                inDB: `Temperature is already in DB! fetching data....`,
                                weather: `Today's weather is ${result.description}. Currently, the temperature is at ${result.temperature} degrees in ${result.city}!`
                            }));
                        });
                    } else {
                        mongo.collection('weatherdata').insertOne({
                            description: `${currentWeather.weather[0].description}`,
                            temperature: `${currentWeather.main.temp}`,
                            city: `${currentWeather.name}`
                        });

                        mongo.collection('weatherdata').findOne({}, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            res.send(compiledFunction({
                                inDB: `Temperature not yet in DB! Adding to mongoDB....`,
                                weather: `Today's weather is ${result.description}. Currently, the temperature is at ${result.temperature} degrees in ${result.city}!`
                            }));
                        });

                    }
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
