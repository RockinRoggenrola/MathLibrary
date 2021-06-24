const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const { Operation, OperationFunctionMap } = require('../Operation Class');
    const NumberSmymbolMap = require('../Number Symbol Map');
    const numbersLen = currentExpression.numbers.length;

    const operation = new Operation(
        OperationFunctionMap.get('*'),
        numbersLen - 1, 2
    );
    const number = NumberSmymbolMap.get(currentExpression.character);

    currentExpression.multDiv.push(operation);
    currentExpression.numbers.push(number);

    return currentExpression;
}

module.exports = new StateSequence('c', 'n', onFunction);