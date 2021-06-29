const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const NumberSymbolMap = require('../NumberSymbolMap');
const ComplexNumber = require('../../ComplexNumberClass');

let onFunction = function(currentExpression) {
    currentExpression.numbers[currentExpression.numbersLen() - 1] = new ComplexNumber(currentExpression.lastNumber(), 0);

    const operation = new Operation('*', currentExpression.numbersLen() - 1, 2);
    const number = NumberSymbolMap.get(currentExpression.character);

    currentExpression.numbers.push(number);
    currentExpression.multDiv.push(operation);
    currentExpression.isDecimal = 0;

    return currentExpression;
};

module.exports = new StateSequence('n', 'c', onFunction);