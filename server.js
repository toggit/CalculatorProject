'use strict';

const express = require('express')
const calculator = require('./calculator.js')
const app = express()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
process.env.NODE_ENV = process.env.NODE_ENV || "development"

console.info("running mode: " + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    console.log = function(){}
}
app.use(express.json());

app.post('/calculate', function (req, res) {
    console.log("post request: calculate called")
    console.log("request.body: " + JSON.stringify(req.body))
    res.json(calculator.calculateNextState(req.body.calculatorState,req.body.input));
})

app.listen(PORT,HOST, () => console.info('Calculator app listening on port 3000!'));