const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const NumberSmymbolMap = require('../NumberSymbolMap');

let onFunction = function(currentExpression) {
    const operation = new Operation('*', currentExpression.numbersLen() - 1, 2);
    const number = NumberSmymbolMap.get(currentExpression.character);

    currentExpression.multDiv.push(operation);
    currentExpression.numbers.push(number);

    return currentExpression;
};

module.exports = new StateSequence('c', 'n', onFunction);