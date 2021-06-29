const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');
const ComplexNumber = require('../../ComplexNumberClass');

let onFunction = function(currentExpression) {
    const operatorSymbol = currentExpression.character;

    if (operatorSymbol == '^') return new InvalidExpression('Can\'t have "^" at the beginning of an expression.', 1);
    else if (operatorSymbol == '*') return new InvalidExpression('Can\'t have "*" at the beginning of an expression.', 1);
    else if (operatorSymbol == '/') return new InvalidExpression('Can\'t have "/" at the beginning of an expression.', 1);
    else if (operatorSymbol == '+') return currentExpression;
    
    currentExpression.numbers.push(new ComplexNumber(-1, 0));
    const operation = new Operation('*', 0, 2);
    currentExpression.multDiv.push(operation);

    return currentExpression;
};

module.exports = new StateSequence('b', 'o', onFunction);