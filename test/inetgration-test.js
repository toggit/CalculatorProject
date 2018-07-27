const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('assert');
const mocha = require("mocha");

const port = process.env.PORT || 3000;

mocha.reporters.Base.symbols.ok = "[PASS]";
mocha.reporters.Base.symbols.err = "[FAIL]";
chai.use(chaiHttp);


 // Interation Testing 

function testAsync(done, fn) {

    try {
        fn();
        done();
    } catch(err) {
        done(err);
    }
}

describe('Test REST api', function() {

    it('send "1" to POST/calculate', (done) => {

        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: null, input: "1"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    assert.equal("1",res.body.display);
                    });
        });
    });

    it('send "2" to POST/calculate- should now display "12"' , (done) => {
        var jsonstate =  {"display": "1","operator": ".","lastValue": "0","inputValue": "1","opflag": false};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: jsonstate, input: "2"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("12", s.display);
                    });
            });
    });

    it('send operator "+" to POST/calculate - shold not change display', (done) => {
        var jsonstate =  {"display": "12","operator": ".","lastValue": "0","inputValue": "12","opflag": false};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: jsonstate, input: "+"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("12", s.display);
                });
            });
    });

    it('send "3" to POST/calculate - should change display to "3"', (done) => {
        var jsonstate =  {"display": "12","operator": "+","lastValue": "12","inputValue": "12","opflag": true};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: jsonstate, input: "3"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("3", s.display);
                });
            });
    });

    it('send operator "/" - should make a calculation for the last operator', (done) => {
        var jsonstate =  {"display": "3","operator": "+","lastValue": "12","inputValue": "3","opflag": false};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: jsonstate, input: "/"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("15", s.display);
                });
            });
    });

    it('send operator after operator - should replace it and not change display', (done) => {
        var jsonstate =  {"display": "15","operator": "/","lastValue": "15","inputValue": "3","opflag": true};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: jsonstate, input: "*"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.deepEqual({"display": "15","operator": "*","lastValue": "15","inputValue": "3","opflag": true}, s);
                });
            });
    });

});

