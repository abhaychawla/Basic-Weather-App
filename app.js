const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');
const apiKey = require('./config/apiKey');

const app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index', {
        weather: null,
        err: null
    });
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; //in celcius
    request(url, function(err, response, body) {
        let message = {
            weather: null,
            err: "Error, please try again!"
        };
        if(!err) {
            let weather = JSON.parse(body);
            if(weather.main) {
                message.weather = `Its ${weather.main.temp} degrees in ${weather.name}`;
                message.err = null;
            }
        }
        console.log(message);
        res.render('index', message);
    });
});


var server = app.listen(app.get('port'), function() {
    console.log('Listening to port ' + server.address().port);
});