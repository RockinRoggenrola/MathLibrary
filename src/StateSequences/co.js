const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');

let onFunction = function(currentExpression) {
    const operatorSymbol = currentExpression.character;
    const operation = new Operation(operatorSymbol, currentExpression.numbersLen() - 1, 2);

    if (operatorSymbol == '^') {
        currentExpression.exponents.unshift(operation);
    } else if (operatorSymbol == '*' || operatorSymbol == '/') {
        currentExpression.multDiv.push(operation);
    } else if (operatorSymbol == '+' || operatorSymbol == '-') {
        currentExpression.addSub.push(operation);
    }

    return currentExpression;
};

module.exports = new StateSequence('c', 'o', onFunction);