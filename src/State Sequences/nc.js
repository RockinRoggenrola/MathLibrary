const StateSequence = require('../State Sequence Class');
const { Operation, OperationFunctionMap } = require('../Operation Class');
const NumberSymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    const operation = new Operation(
        OperationFunctionMap.get('*'),
        currentExpression.numbersLen() - 1, 2
    );
    const number = NumberSymbolMap.get(currentExpression.character);

    currentExpression.numbers.push(number);
    currentExpression.multDiv.push(operation);
    currentExpression.isDecimal = 0;

    return currentExpression;
};

module.exports = new StateSequence('n', 'c', onFunction);