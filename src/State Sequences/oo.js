const StateSequence = require('../State Sequence Class');
const { Operation, OperationFunctionMap } = require('../Operation Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    if (currentExpression.character == '*' && 
    currentExpression.lastCharacter ==  '*') {
        currentExpression.multDiv.pop();
        const numbersLen = currentExpression.numbers.length;
        let operation = new Operation(
            OperationFunctionMap.get('^'),
            numbersLen - 1, 2
        )

        currentExpression.exponents.unshift(operation);
        return currentExpression;
    }
    return new InvalidExpression('Can\'t have 2 successive operators.', currentExpression.strIndex);
}

module.exports = new StateSequence('o', 'o', onFunction);