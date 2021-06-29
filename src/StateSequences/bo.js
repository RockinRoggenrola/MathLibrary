const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');
const ComplexNumber = require('../../ComplexNumberClass');

let onFunction = function() {
    const operatorSymbol = this.character;

    if (operatorSymbol == '^') return new InvalidExpression('Can\'t have "^" at the beginning of an expression.', 1);
    else if (operatorSymbol == '*') return new InvalidExpression('Can\'t have "*" at the beginning of an expression.', 1);
    else if (operatorSymbol == '/') return new InvalidExpression('Can\'t have "/" at the beginning of an expression.', 1);
    else if (operatorSymbol == '+') return;
    
    this.numbers.push(new ComplexNumber(-1, 0));
    const operation = new Operation('*', 0, 2);
    this.multDiv.push(operation);
};

module.exports = new StateSequence('b', 'o', onFunction);