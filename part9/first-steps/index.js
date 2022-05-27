"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var bmiCalculator_1 = __importDefault(require("./bmiCalculator"));
var exerciseCalculator_1 = __importDefault(require("./exerciseCalculator"));
var app = express();
app.use(bodyParser.json());
app.get('/ping', function (_req, res) {
    res.send('PONG');
});
app.get('/bmi', function (req, res) {
    var height = Number(req.query.height);
    var weight = Number(req.query.weight);
    var results = (0, bmiCalculator_1["default"])({ height: height, weight: weight });
    if (results === 'Error !') {
        res.status(400).send(JSON.stringify({ error: 'malformatted parameters' }));
    }
    else {
        res.status(200).send(JSON.stringify({ height: height, weight: weight, results: results }));
    }
});
app.post('/exercises', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var _a = req.body, daily_exercises = _a.daily_exercises, target = _a.target;
    if (!daily_exercises || !target) {
        res.status(400).send(JSON.stringify({ error: 'parameters missing' }));
    }
    else {
        if (!Array.isArray(daily_exercises) || isNaN(target)) {
            res.status(400).send(JSON.stringify({ error: 'malformatted parameters' }));
        }
        else {
            var results = (0, exerciseCalculator_1["default"])(daily_exercises, target);
            var response = JSON.stringify(results);
            res.status(200).send(response);
        }
    }
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("server started at http://localhost:".concat(PORT));
});
