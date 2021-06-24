const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const { Operation, OperationFunctionMap } = require('../Operation Class');
    const NumberSymbolMap = require('../Number Symbol Map');
    const numbersLen = currentExpression.numbers.length;

    const operation = new Operation(
        OperationFunctionMap.get('*'),
        numbersLen - 1, 2
    );
    const number = NumberSymbolMap.get(currentExpression.character);

    currentExpression.numbers.push(number);
    currentExpression.multDiv.push(operation);

    return currentExpression;
}

module.exports = new StateSequence('n', 'c', onFunction);