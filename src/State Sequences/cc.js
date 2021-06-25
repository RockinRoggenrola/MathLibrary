const StateSequence = require('../State Sequence Class');
const { Operation, OperationFunctionMap } = require('../Operation Class');
const NumberSmymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    const operation = new Operation(
        OperationFunctionMap.get('*'),
        currentExpression.numbersLen() - 1, 2
    )
    const number = NumberSmymbolMap.get(currentExpression.character);
    
    currentExpression.multDiv.push(operation);
    currentExpression.numbers.push(number);

    return currentExpression;
};

module.exports = new StateSequence('c', 'c', onFunction);