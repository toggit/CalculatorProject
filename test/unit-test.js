const chai = require('chai');
const calculator = require('../calculator');
const assert = require('assert');
const mocha = require("mocha");

mocha.reporters.Base.symbols.ok = "[PASS]";
mocha.reporters.Base.symbols.err = "[FAIL]";

 // Unit Testing for calculateNextState() function

describe('unit testing calculateNextState function', () => {

    it('test invalid input one charcter "a"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "a");
        assert.deepEqual(s, {display: "invalid input!. try again",operator: ".",lastValue: "0",inputValue:"0",opflag:false});
    });

    it('test invalid input string "^7asdkh#"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "^7asdkh#");
        assert.deepEqual(s, {display: "invalid input!. try again",operator: ".",lastValue: "0",inputValue:"0",opflag:false});
    });

    it('test invalid input string "77"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "77");
        assert.deepEqual(s, {display: "invalid input!. try again",operator: ".",lastValue: "0",inputValue:"0",opflag:false});
    });

    it('test sending an operators *+', () => {
        let s = null;
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "0",operator: "*",lastValue: "0",inputValue:"0",opflag:true});
        s = null;
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "0",operator: "+",lastValue: "0",inputValue:"0",opflag:true});
    });

    it('test sending inputs "+5"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "0",operator: "+",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "+",lastValue: "0",inputValue:"5",opflag:false});
    });

    it('test sending inputs "+-5"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "0",operator: "+",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "0",operator: "-",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "-",lastValue: "0",inputValue:"5",opflag:false});
    });

    it('test sending inputs "2+=="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "0",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "2",operator: "+",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "4",operator: "+",lastValue: "4",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "6",operator: "+",lastValue: "6",inputValue:"2",opflag:true});
    });

    it('test sending inputs "+-5*2"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "0",operator: "+",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "0",operator: "-",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "-",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "-5",operator: "*",lastValue: "-5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "-5",inputValue:"2",opflag:false});
    });

    it('test sending inputs "+-5*2="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "0",operator: "+",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "0",operator: "-",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "-",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "-5",operator: "*",lastValue: "-5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "-5",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "-10",operator: "*",lastValue: "-10",inputValue:"2",opflag:true});
    });

    it('test sending inputs "=5="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "5",inputValue:"5",opflag:true});
    });

    it('test sending inputs "=5=3"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "5",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "32",operator: ".",lastValue: "5",inputValue:"32",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "32",operator: ".",lastValue: "32",inputValue:"32",opflag:true});
    });

        it('test sending inputs "=5=3=2=="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "5",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "2",inputValue:"2",opflag:true});
    });

    it('test sending inputs "=5=3=2==*3="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "5",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: "*",lastValue: "2",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "6",operator: "*",lastValue: "6",inputValue:"3",opflag:true});
    });

        it('test sending inputs "=5=3=2=-*3="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "0",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "5",operator: ".",lastValue: "5",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "5",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: ".",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "2",operator: "-",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "2",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: "*",lastValue: "2",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "6",operator: "*",lastValue: "6",inputValue:"3",opflag:true});
    });


    it('test sending inputs "124"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "1");
        assert.equal(s.display, "1");
        s = calculator.calculateNextState(s, "2");
        assert.equal(s.display, "12");
        s = calculator.calculateNextState(s, "4");
        assert.equal(s.display, "124");
    });

    it('test sending inputs "3+2+1="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "0",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "3",operator: "+",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "+",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "5",operator: "+",lastValue: "5",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "5",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "6",operator: "+",lastValue: "6",inputValue:"1",opflag:true});
    });

    it('test sending inputs "3+-2+1="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "0",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "3",operator: "+",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "3",operator: "-",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "-",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "1",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "1",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: "+",lastValue: "2",inputValue:"1",opflag:true});
    });

        it('test sending inputs "3=*2+1==="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "0",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "3",operator: "*",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "6",operator: "+",lastValue: "6",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "6",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "7",operator: "+",lastValue: "7",inputValue:"1",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "8",operator: "+",lastValue: "8",inputValue:"1",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "9",operator: "+",lastValue: "9",inputValue:"1",opflag:true});
    });

    it('test sending inputs "3+-2+1=*2+==15*3"', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "0",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "3",operator: "+",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "3",operator: "-",lastValue: "3",inputValue:"3",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "-",lastValue: "3",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "1",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "1",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "2",operator: "+",lastValue: "2",inputValue:"1",opflag:true});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "2",inputValue:"1",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "*",lastValue: "2",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "4",operator: "+",lastValue: "4",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "6",operator: "+",lastValue: "6",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "8",operator: "+",lastValue: "8",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: "+",lastValue: "8",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "15",operator: "+",lastValue: "8",inputValue:"15",opflag:false});
        s = calculator.calculateNextState(s, "*");
        assert.deepEqual(s, {display: "23",operator: "*",lastValue: "23",inputValue:"15",opflag:true});
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: "*",lastValue: "23",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "69",operator: "*",lastValue: "69",inputValue:"3",opflag:true});
    });

    
    it('test sending inputs "30+-20+5="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.deepEqual(s, {display: "3",operator: ".",lastValue: "0",inputValue:"3",opflag:false});
        s = calculator.calculateNextState(s, "0");
        assert.deepEqual(s, {display: "30",operator: ".",lastValue: "0",inputValue:"30",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "30",operator: "+",lastValue: "30",inputValue:"30",opflag:true});
        s = calculator.calculateNextState(s, "-");
        assert.deepEqual(s, {display: "30",operator: "-",lastValue: "30",inputValue:"30",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "-",lastValue: "30",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "0");
        assert.deepEqual(s, {display: "20",operator: "-",lastValue: "30",inputValue:"20",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "10",operator: "+",lastValue: "10",inputValue:"20",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "+",lastValue: "10",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "15",operator: "+",lastValue: "15",inputValue:"5",opflag:true});
    });

        it('test sending inputs "10+5=+2=="', () => {
        let s = null;
        s = calculator.calculateNextState(s, "1");
        assert.deepEqual(s, {display: "1",operator: ".",lastValue: "0",inputValue:"1",opflag:false});
        s = calculator.calculateNextState(s, "0");
        assert.deepEqual(s, {display: "10",operator: ".",lastValue: "0",inputValue:"10",opflag:false});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "10",operator: "+",lastValue: "10",inputValue:"10",opflag:true});
        s = calculator.calculateNextState(s, "5");
        assert.deepEqual(s, {display: "5",operator: "+",lastValue: "10",inputValue:"5",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "15",operator: "+",lastValue: "15",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "+");
        assert.deepEqual(s, {display: "15",operator: "+",lastValue: "15",inputValue:"5",opflag:true});
        s = calculator.calculateNextState(s, "2");
        assert.deepEqual(s, {display: "2",operator: "+",lastValue: "15",inputValue:"2",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "17",operator: "+",lastValue: "17",inputValue:"2",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "19",operator: "+",lastValue: "19",inputValue:"2",opflag:true});
    });

    it('test division by 0  "8/0=', () => {
        let s = null;
        s = calculator.calculateNextState(s, "8");
        assert.deepEqual(s, {display: "8",operator: ".",lastValue: "0",inputValue:"8",opflag:false});
        s = calculator.calculateNextState(s, "/");
        assert.deepEqual(s, {display: "8",operator: "/",lastValue: "8",inputValue:"8",opflag:true});
        s = calculator.calculateNextState(s, "0");
        assert.deepEqual(s, {display: "0",operator: "/",lastValue: "8",inputValue:"0",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "Cannot divide by zero",operator: "q",lastValue: "8",inputValue:"0",opflag:true});
    });

        it('test division by 0  "8/0==', () => {
        let s = null;
        s = calculator.calculateNextState(s, "8");
        assert.deepEqual(s, {display: "8",operator: ".",lastValue: "0",inputValue:"8",opflag:false});
        s = calculator.calculateNextState(s, "/");
        assert.deepEqual(s, {display: "8",operator: "/",lastValue: "8",inputValue:"8",opflag:true});
        s = calculator.calculateNextState(s, "0");
        assert.deepEqual(s, {display: "0",operator: "/",lastValue: "8",inputValue:"0",opflag:false});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "Cannot divide by zero",operator: "q",lastValue: "8",inputValue:"0",opflag:true});
        s = calculator.calculateNextState(s, "=");
        assert.deepEqual(s, {display: "0",operator: ".",lastValue: "0",inputValue:"0",opflag:true});
    });
//  the example from word
    it('test alot of operations', () => {
        let s = null;
        s = calculator.calculateNextState(s, "1");
        assert.equal(s.display, "1");
        s = calculator.calculateNextState(s, "2");
        assert.equal(s.display, "12");
        s = calculator.calculateNextState(s, "+");
        assert.equal(s.display, "12");
        s = calculator.calculateNextState(s, "4");
        assert.equal(s.display, "4");
        s = calculator.calculateNextState(s, "3");
        assert.equal(s.display, "43");
        s = calculator.calculateNextState(s, "=");
        assert.equal(s.display, "55");
        s = calculator.calculateNextState(s, "+");
        assert.equal(s.display, "55");
        s = calculator.calculateNextState(s, "1");
        assert.equal(s.display, "1");
        s = calculator.calculateNextState(s, "=");
        assert.equal(s.display, "56");
    });

});