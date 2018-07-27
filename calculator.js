
isDigit = function (input) {
    if (/^\d$/.test(input)) {
        return true
    }
    return false
}

isOperator = function (input) {
    if ((input == "+") || (input == "-") || (input == "/") || (input == "*") || (input == "=")) {
        return true
    }
    return false
}

isCalculatorStateValid = function (calculatorState) {
    if (typeof calculatorState === 'string') {
        try {
            JSON.parse(calculatorState)
        }
        catch (e) {
            console.log("error - Could not use JSON.parse on calculatorState: " + e);
            return false;
        }
    }

    if (isNaN(parseInt(calculatorState.lastValue)) ||
        isNaN(parseInt(calculatorState.inputValue)) ||
        (!isOperator(calculatorState.operator) && calculatorState.operator !== ".") ||
        (calculatorState.opflag !== true && calculatorState.opflag !== false)
    ) {
        return false;
    }
    return true;
}

calculateNextState = function (calculatorState, input) {

    if (calculatorState == null) {
        calculatorState = { display: "0", operator: ".", lastValue: "0", inputValue: "0", opflag: false };
    }
    else {
        if (!isCalculatorStateValid(calculatorState)) {
            calculatorState = { display: "0", operator: ".", lastValue: "0", inputValue: "0", opflag: false };
        }
    }

    if (!isDigit(input) && !isOperator(input)) {
        calculatorState.display = "invalid input!. try again"
    }

    if (isDigit(input)) {
        if (!calculatorState.opflag && calculatorState.inputValue !== "0") {
            calculatorState.inputValue += input;
        }
        else {
            calculatorState.inputValue = input;
            calculatorState.opflag = false;
        }
        calculatorState.display = calculatorState.inputValue;
    }

    if (isOperator(input)) {

        var prev = parseInt(calculatorState.lastValue);
        var curr = parseInt(calculatorState.inputValue);

        if (!calculatorState.opflag || (calculatorState.opflag && input === "=")) {

            switch (calculatorState.operator) {
                case "-":
                    prev -= curr;
                    break;
                case "+":
                    prev += curr;
                    break;
                case "*":
                    prev *= curr;
                    break;
                case "/":
                    if (curr == 0) {
                        calculatorState.display = "Cannot divide by zero";
                        calculatorState.operator = "q"
                        calculatorState.opflag = true;
                        return calculatorState;
                    }
                    else {
                        prev /= curr;
                    }
                    break;
                case ".":
                    prev = curr
            }
            calculatorState.display = prev.toString();
            calculatorState.lastValue = prev.toString();
        } else {
            calculatorState.lastValue = calculatorState.display
        }

        if (input !== "=") {
            calculatorState.operator = input;
        }
        calculatorState.opflag = true;
    }

    return calculatorState;
}

module.exports.calculateNextState = calculateNextState


